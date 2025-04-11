import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchWithFallback(url: string, options?: RequestInit) {
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error)

    // If the URL contains 'mongoose', try the non-mongoose version
    if (url.includes("mongoose")) {
      const fallbackUrl = url.replace("mongoose", "")
      console.log(`Attempting fallback to ${fallbackUrl}`)

      try {
        const fallbackResponse = await fetch(fallbackUrl, options)
        if (!fallbackResponse.ok) {
          throw new Error(`HTTP error! status: ${fallbackResponse.status}`)
        }
        return await fallbackResponse.json()
      } catch (fallbackError) {
        console.error(`Fallback also failed:`, fallbackError)
        throw fallbackError
      }
    }

    throw error
  }
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount)
}

export function formatNumber(number: number): string {
  return new Intl.NumberFormat("en-US").format(number)
}

export function formatPercentage(number: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number / 100)
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.substring(0, chars)}...${address.substring(address.length - chars)}`
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "completed":
      return "text-green-500"
    case "pending":
      return "text-yellow-500"
    case "failed":
      return "text-red-500"
    default:
      return "text-gray-500"
  }
}
