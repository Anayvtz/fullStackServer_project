const normalizeYarn = async (rawYarn) => {
    return {
        ...rawYarn,
        image: {
            url:
                rawYarn.image.url ||
                "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSDF8F9mZDqU1zQP4Aowlb35yx9zlMtS7Cgo50fB6C7Cr8rZ8l4HuQZ-eeQpg1k9YYelvUgu8o9XRhGStlPJaJPUHST32Ys2jGZpIYqoigc&usqp=CAc",
            alt: rawCard.image.alt || "yarns image",
        }

    };
};

module.exports = normalizeYarn;