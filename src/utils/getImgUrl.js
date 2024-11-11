function getImgUrl(name) {
    return new URL(`../assets/bicicletas/${name}`, import.meta.url)
}

export { getImgUrl }