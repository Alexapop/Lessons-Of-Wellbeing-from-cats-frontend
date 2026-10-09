import { test, expect } from '@playwright/test'

const screenWidths = [320, 768, 1440]

for (const width of screenWidths) {
    test(`uses matching page and title styles at ${width}px`, async ({
        page,
    }) => {
        await page.setViewportSize({ width, height: 900 })

        await page.goto('/')

        const homeLayout = await readLayout(page)

        await page.goto('/class-calendar')

        const calendarLayout = await readLayout(page)

        expect(calendarLayout).toEqual(homeLayout)
    })

    for (const route of ['/', '/class-calendar']) {
        test(`has no horizontal overflow on ${route} at ${width}px`, async ({
            page,
        }) => {
            await page.setViewportSize({ width, height: 900 })
            await page.goto(route)

            await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

            await expect.poll(async () => {
                return page.evaluate(() => {
                    return (
                        document.documentElement.scrollWidth -
                        document.documentElement.clientWidth
                    )
                })
            }).toBeLessThanOrEqual(1)
        })
    }
}

async function readLayout(page) {
    return page.locator('main').evaluate((main) => {
        const title = main.querySelector('h1')
        const pageStyle = getComputedStyle(main)
        const titleStyle = getComputedStyle(title)
        const bounds = main.getBoundingClientRect()

        return {
            left: bounds.left,
            width: bounds.width,
            paddingTop: pageStyle.paddingTop,
            paddingBottom: pageStyle.paddingBottom,
            titleFont: titleStyle.fontFamily,
            titleSize: titleStyle.fontSize,
            titleWeight: titleStyle.fontWeight,
            titleColor: titleStyle.color,
            titleLineHeight: titleStyle.lineHeight,
        }
    })
}