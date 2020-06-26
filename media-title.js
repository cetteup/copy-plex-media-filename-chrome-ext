function getRawTitle() {
    let title = document.querySelector("div.title h2 a").textContent;
    let release_year = document.querySelector("div.title h2 span").textContent;

    return title.concat(" ", release_year);
}

function formatMovieTitle() {
    let raw_title = getRawTitle();
    // Set up (p)atterns and (r)eplacements
    let formatters = [
        { p: /ä/g, r: 'ae' },
        { p: /Ä/g, r: 'Ae' },
        { p: /ö/g, r: 'oe' },
        { p: /Ö/g, r: 'Oe' },
        { p: /ü/g, r: 'ue' },
        { p: /Ü/g, r: 'Ue' },
        { p: /ß/g, r: 'ss' },
        { p: /[^0-9a-zA-Z()]+/g, r: '-' }  // replace spaces and special characters with dashes
    ]
    // Run formatters over raw title
    let formatted_title = formatters.reduce(function (title, formatter) { return title.replace(formatter.p, formatter.r) }, raw_title);

    return formatted_title;
}

// Get title element
let title_elem = document.querySelector("div.title h2 a");
// Make to only execute if title element was found
if ( title_elem != null ) {
    // Remove link to self from title element
    title_elem.removeAttribute("href");
    // Add copy-to-clipboard to title element
    let clipboard = new ClipboardJS(title_elem, {
        text: formatMovieTitle
    });
    // Log any errors
    clipboard.on('error', function(e) {
        console.log(e);
    });
}
