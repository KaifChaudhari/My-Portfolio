#!/usr/bin/env node
/**
 * TryHackMe Profile Scraper
 * 
 * Uses Playwright to bypass Cloudflare and scrape public profile data.
 * Run in GitHub Actions on a schedule to keep thm-cache.json updated.
 * 
 * Usage: node scripts/fetch-thm-stats.mjs
 * Requires: npx playwright install chromium
 */

import { chromium } from "playwright";
import { writeFileSync, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_PATH = resolve(__dirname, "../data/thm-cache.json");
const USERNAME = "kaifchaudhari";
const PROFILE_URL = `https://tryhackme.com/r/p/${USERNAME}`;

async function scrape() {
  console.log(`[THM Scraper] Fetching profile for: ${USERNAME}`);
  
  // Load existing cache as fallback
  let cache;
  try {
    cache = JSON.parse(readFileSync(CACHE_PATH, "utf-8"));
  } catch {
    cache = {};
  }

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    // Navigate to public profile page
    await page.goto(PROFILE_URL, { waitUntil: "networkidle", timeout: 30000 });
    
    // Wait for profile content to load
    await page.waitForTimeout(5000);

    // Extract rank
    const rank = await page.$eval(
      '[class*="rank"], [data-testid*="rank"]',
      (el) => el.textContent?.trim() || ""
    ).catch(() => cache.rank || "Top 20%");

    // Extract rooms completed
    const roomsText = await page.$$eval(
      '[class*="stat"], [class*="room"]',
      (els) => {
        for (const el of els) {
          const text = el.textContent || "";
          const match = text.match(/(\d+)\s*rooms?/i);
          if (match) return parseInt(match[1], 10);
        }
        return null;
      }
    ).catch(() => null);

    // Extract badges
    const badges = await page.$$eval(
      '[class*="badge"]',
      (els) => els.map((el) => ({
        name: el.querySelector('[class*="name"], h3, h4, strong')?.textContent?.trim() || "",
        description: el.querySelector('[class*="desc"], p')?.textContent?.trim() || "",
      })).filter((b) => b.name)
    ).catch(() => []);

    // Build updated cache
    const updated = {
      username: USERNAME,
      rank: rank || cache.rank || "Top 20%",
      roomsCompleted: roomsText || cache.roomsCompleted || 44,
      badgesCount: badges.length > 0 ? badges.length : cache.badgesCount || 4,
      badges: badges.length > 0 
        ? badges.map((b, i) => ({
            ...b,
            rarity: cache.badges?.[i]?.rarity || "Unknown",
            icon: cache.badges?.[i]?.icon || "award",
            color: cache.badges?.[i]?.color || "#88cc14",
          }))
        : cache.badges || [],
      skills: cache.skills || [], // Skills scraped separately or kept manual
      lastUpdated: new Date().toISOString(),
    };

    writeFileSync(CACHE_PATH, JSON.stringify(updated, null, 2) + "\n");
    console.log("[THM Scraper] Cache updated successfully!");
    console.log(JSON.stringify(updated, null, 2));
    
  } catch (error) {
    console.error("[THM Scraper] Scraping failed, keeping existing cache:", error.message);
    // Update only the timestamp to show the scraper ran
    cache.lastUpdated = new Date().toISOString();
    cache._scrapeError = error.message;
    writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2) + "\n");
    process.exit(0); // Don't fail the workflow — keep cached data
  } finally {
    if (browser) await browser.close();
  }
}

scrape();
