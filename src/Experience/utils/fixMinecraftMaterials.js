import * as THREE from "three";

const CUTOUT = [
    "flower",
    "orchid",
    "tulip",
    "poppy",
    "fern",
    "grass",
    "leaves",
    "roots",
    "kelp",
    "seagrass",
    "sugar_cane",
    "torchflower",
    "vine",
    "sapling",
    "amethyst",
    "bud",

    // Added
    "allium",
    "azalea",
    "flowering_azalea",
    "flower_pot",
    "potted",
    "medium_amethyst_bud",

    "item_frame",

    // Your custom images
    "face",
    "about",
    "projects",
    "skills",
    "exp",
    "connect",
    "achieve"
];

const TRANSPARENT = [
    "glass",
    "pane",
    "water",
    "ice"
];

export function fixMinecraftMaterials(materials) {
    Object.entries(materials).forEach(([name, mat]) => {

    const n = name.toLowerCase();

        // Only modify Minecraft materials
        const isMinecraft = n.startsWith("minecraft_");
        const isCustomCutout = CUTOUT.some(x => n.includes(x));

        if (!isMinecraft && !isCustomCutout) {
            return;
        }

        // Always use sRGB textures
        if (mat.map) {
            mat.map.colorSpace = THREE.SRGBColorSpace;
        }

        // ---------------------------------
        // Transparent
        // ---------------------------------

        if (TRANSPARENT.some(x => n.includes(x))) {

            mat.transparent = true;
            mat.opacity = 1;

            mat.alphaTest = 0;

            mat.depthWrite = false;
            mat.depthTest = true;

            mat.side = THREE.DoubleSide;

            mat.needsUpdate = true;

            return;
        }

        // ---------------------------------
        // Cutout
        // ---------------------------------

        if (CUTOUT.some(x => n.includes(x))) {

            mat.transparent = false;

            mat.alphaTest = 0.5;

            mat.depthWrite = true;
            mat.depthTest = true;

            mat.side = THREE.DoubleSide;

            mat.needsUpdate = true;

            return;
        }

        // ---------------------------------
        // Opaque
        // ---------------------------------

        mat.transparent = false;

        mat.alphaTest = 0;

        mat.depthWrite = true;
        mat.depthTest = true;

        mat.side = THREE.DoubleSide;

        mat.needsUpdate = true;

    });

}