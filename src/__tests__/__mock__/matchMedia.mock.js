/**
 * All elements inside Hidden component will be hidden and we cannot test them,
 * this mock is created to fix it.
 *
 * refer to:
 * - https://v4.mui.com/components/use-media-query/#testing
 * - https://stackoverflow.com/questions/65027275/implementing-creatematchmedia-for-material-ui-im-using-a-material-ui-hidden
 */
import mediaQuery from 'css-mediaquery'

const createMatchMedia = (width) => {
    return (query) => ({
        matches: mediaQuery.match(query, { width }),
        addListener: () => {},
        removeListener: () => {},
    })
}

window.matchMedia = createMatchMedia(window.innerWidth)

export default {}
