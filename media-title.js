function getRawTitle() {
    var title = $("div.title h2 a").text();
    var release_year = $("div.title h2 span").text();

    return title.concat(" ", release_year);
}
function setClipboardText(text){
    var id = "clean-plex-title";
    var existsTextarea = document.getElementById(id);

    if(!existsTextarea){
        console.log("Creating textarea");
        var textarea = document.createElement("textarea");
        textarea.id = id;
        // Place in top-left corner of screen regardless of scroll position.
        textarea.style.position = 'fixed';
        textarea.style.top = 0;
        textarea.style.left = 0;

        // Ensure it has a small width and height. Setting to 1px / 1em
        // doesn't work as this gives a negative w/h on some browsers.
        textarea.style.width = '1px';
        textarea.style.height = '1px';

        // We don't need padding, reducing the size if it does flash render.
        textarea.style.padding = 0;

        // Clean up any borders.
        textarea.style.border = 'none';
        textarea.style.outline = 'none';
        textarea.style.boxShadow = 'none';

        // Avoid flash of white box if rendered for any reason.
        textarea.style.background = 'transparent';
        document.querySelector("body").appendChild(textarea);
        console.log("The textarea now exists :)");
        existsTextarea = document.getElementById(id);
    }else{
        console.log("The textarea already exists :3")
    }

    existsTextarea.value = text;
    existsTextarea.select();

    try {
        var status = document.execCommand('copy');
        if(!status){
            console.error("Cannot copy text");
        }else{
            console.log("The text is now on the clipboard");
        }
    } catch (err) {
        console.log('Unable to copy.');
    }
}
function formatMovieTitle(e) {
    var raw_title = getRawTitle();
    var clean_title = raw_title.replace(/ä/g,'ae');
    clean_title = clean_title.replace(/Ä/g,'Ae');
    clean_title = clean_title.replace(/ö/g,'oe');
    clean_title = clean_title.replace(/Ö/g,'Oe');
    clean_title = clean_title.replace(/ü/g,'ue');
    clean_title = clean_title.replace(/Ü/g,'Ue');
    clean_title = clean_title.replace(/ß/g,'ss');
    clean_title = clean_title.replace(/[^0-9a-zA-Z()]+/g,'-');
    setClipboardText(clean_title);
    e.preventDefault();
}

$( document ).ready(function() {
    var title_elem = $("div.title h2 a");
    if ( title_elem.length > 0 ) {
        title_elem.click(formatMovieTitle);
    }
});
