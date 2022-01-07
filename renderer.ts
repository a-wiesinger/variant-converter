// Initialize variables to hold page elements
const closeButton = <HTMLDivElement> document.getElementById('close-button');
const userInput = <HTMLInputElement> document.getElementById('user-input');
const convertButton = <HTMLButtonElement> document.getElementById('convert-button');
const clearButton = <HTMLButtonElement> document.getElementById('clear-button');
const variantOutput = <HTMLDivElement> document.getElementById('variant-code');
const catCodeOutput = <HTMLDivElement> document.getElementById('catalog-code');
const copyVariantIDButton = <HTMLDivElement> document.getElementById('copy-variant-btn');
const copyCatalogCodeButton = <HTMLDivElement> document.getElementById('copy-catalog-code-btn');
const copiedVariant = <HTMLDivElement> document.getElementById('variant-id-copied');
const copiedCatCode = <HTMLDivElement> document.getElementById('catalog-code-copied');

// Functions
function CopyTextTimer(arg: string): void {
    if (arg === 'variant') {
        copiedVariant.style.cssText = 'opacity: 1;';
        setTimeout(() => {copiedVariant.style.cssText = 'opacity: 0;';}, 2000);
    } else {
        copiedCatCode.style.cssText = 'opacity: 1;';
        setTimeout(() => {copiedCatCode.style.cssText = 'opacity: 0;';}, 2000);
    }
}

// Button click events
// Convert button
convertButton.addEventListener('click', async () => {
    catCodeOutput.innerHTML = userInput.value;
    variantOutput.innerHTML = userInput.value.replace(/,/g, '-');
});

// Close button
closeButton.addEventListener('click', async () => {
    ipcRenderer.send('close-clicked', 'closed');
});

// Copy Shopify Variant ID
copyVariantIDButton.addEventListener('click', async () => {
    ipcRenderer.send('copy-variant-clicked', variantOutput.innerHTML);
    CopyTextTimer('variant');
});

// Copy Catalog Code
copyCatalogCodeButton.addEventListener('click', async () => {
    ipcRenderer.send('copy-catalog-code-clicked', catCodeOutput.innerHTML);
    CopyTextTimer('catalog');
});

// Reload (Clear) App Contents
clearButton.addEventListener('click', async () => {
    ipcRenderer.send('clear-page', 'cleared');
});