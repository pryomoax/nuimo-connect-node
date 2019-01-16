import { DeviceDiscoveryManager } from '../..'
import { DEVICE_DISCOVERY_TIMEOUT_MS } from '../..'

// Device connection manager
const manager = DeviceDiscoveryManager.defaultManager

// Uncomment to search for only your device
// ENTER DEVICE_ID to discover only a particular device
const DEVICE_ID: string | undefined = undefined

/**
 * Main application entry point
 */
async function main() {
    console.log('Starting Numio Control discovery')

    // Create a new discovery session
    // Will throw an NuimoError if timed out, be sure to capture it
    const session = manager.startDiscoverySession({
        timeoutMs: DEVICE_DISCOVERY_TIMEOUT_MS,         // Optional, waits forever otherwise
        deviceIds: DEVICE_ID ? [DEVICE_ID] : undefined, // Optional, define DEVICE_ID above to limit to a single device
    })

    console.log('Waiting for device...')

    // Convenience to await the first discovered Nuimo device
    const device = await session.waitForFirstDevice()

    console.log(`Found device '${device.id}'`)
    console.log('Connecting...')

    // Establish device connection
    if (await device.connect()) {
        console.log('Connected to Nuimo Control')

        console.log('DEVICE INFO:')
        console.log(`ID:      ${device.id}`)
        console.log(`RSSI:    ${device.rssi}`)
        console.log(`BATTERY: ${device.batteryLevel}`)
    }
}

import { bootstrap } from '../utils'

// Boot strap async function
bootstrap(main)