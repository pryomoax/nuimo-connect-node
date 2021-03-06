import * as chalk from 'chalk'

import { DeviceDiscoveryManager, NuimoControlDevice, NuimoDeviceCommunicationError, NuimoDeviceCommunicationErrorCode } from '..'
import { DEVICE_DISCOVERY_TIMEOUT_MS } from '../src/defaults'

// Device connection manager
const manager = DeviceDiscoveryManager.defaultManager

/**
 * Helper function to connect to a device
 *
 * @param [deviceId] - specific device to connect to
 */
export async function connectToDevice(deviceId?: string): Promise<NuimoControlDevice> {
    console.log('Starting Numio Control discovery')
    const session = manager.startDiscoverySession({
        timeoutMs: DEVICE_DISCOVERY_TIMEOUT_MS,
        deviceIds: deviceId ? [deviceId] : undefined,
    })

    console.log('Waiting for device...')
    const device = await session.waitForFirstDevice()
    console.log(`Found device '${device.id}'`)

    console.log('Connecting...')
    if (await device.connect()) {
        console.log('Connected to Nuimo Control')

        device.on('disconnect', () => {
            console.log('Disconnected! Exiting.')

            // On a disconnect, exit
            process.exit(0)
        })

        return device
    }

    // Throw error
    throw new NuimoDeviceCommunicationError(NuimoDeviceCommunicationErrorCode.ConnectionTimeout, device.id)
}

/**
 * Helper to log events
 *
 * @param eventName - name of event
 * @param [params] - event params
 */
export function logEvent(eventName: string, params?: Record<string, any>) {
    console.log(`'${chalk.bold.green(eventName)}' event`)
    if (params) {
        for (const key of Reflect.ownKeys(params)) {
            // tslint:disable-next-line:strict-type-predicates tsc does not correctly type-check
            if (typeof key === 'string') {
                console.log(`> ${chalk.bold(key)}: ${chalk.italic(params[key])}`)
            }
        }

    }
}

/**
 * Async bootstrap
 *
 * @param main - main function
 */
export function bootstrap(main: () => Promise<void>) {
    main().catch(err => {
        console.error(`Connection error: ${err.message}`)
    })
}
