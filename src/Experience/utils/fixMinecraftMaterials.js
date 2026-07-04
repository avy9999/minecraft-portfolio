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

    "allium",
    "azalea",
    "flowering_azalea",
    "flower_pot",
    "potted",
    "medium_amethyst_bud",

    "item_frame",

    // custom UI textures
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

        const isMinecraft = n.startsWith("minecraft_");
        const isCustomCutout = CUTOUT.some(x => n.includes(x));

        if (!isMinecraft && !isCustomCutout) return;

        // -----------------------------
        // texture color space fix
        // -----------------------------
        if (mat.map) {
            mat.map.colorSpace = THREE.SRGBColorSpace;
        }

        // -----------------------------
        // GRASS (SPECIAL CASE)
        // -----------------------------
        if (n.includes("grass")) {

            mat.color = new THREE.Color().offsetHSL(
                0,
                0,
                (Math.random() - 0.5) * 0.06
            );

            mat.transparent = false;
            mat.alphaTest = 0.5;

            mat.side = THREE.FrontSide;

            mat.roughness = 1;
            mat.metalness = 0;
            mat.envMapIntensity = 0.2;

            mat.depthWrite = true;
            mat.depthTest = true;

            mat.needsUpdate = true;

            return;
        }

        if (n.includes("water")) {

            mat.transparent = true;
            mat.opacity = 0.85;

            mat.alphaTest = 0;

            mat.depthWrite = false;   // CRITICAL
            mat.depthTest = true;

            mat.side = THREE.FrontSide;

            mat.blending = THREE.NormalBlending;

            mat.roughness = 0;
            mat.metalness = 0;

            mat.envMapIntensity = 0.3;

            mat.needsUpdate = true;

            return;
        }

        // -----------------------------
        // CLOUDS (SPECIAL CASE)
        // -----------------------------
        if (n.includes("cloud")) {

            mat.transparent = true;
            mat.opacity = 0.85;

            mat.alphaTest = 0.2;

            mat.depthWrite = false;
            mat.depthTest = true;

            mat.side = THREE.FrontSide;

            mat.envMapIntensity = 0.1;

            mat.needsUpdate = true;

            return;
        }

        // -----------------------------
        // TRANSPARENT BLOCKS
        // -----------------------------
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

        // -----------------------------
        // CUTOUT BLOCKS
        // -----------------------------
        if (CUTOUT.some(x => n.includes(x))) {

            mat.transparent = false;
            mat.alphaTest = 0.5;

            mat.depthWrite = true;
            mat.depthTest = true;

            // 🌸 FIX: flowers need DoubleSide, others not
            if (
                n.includes("flower") ||
                n.includes("orchid") ||
                n.includes("tulip") ||
                n.includes("poppy") ||
                n.includes("allium")
            ) {
                mat.side = THREE.DoubleSide;
            } else {
                mat.side = THREE.FrontSide;
            }

            mat.needsUpdate = true;
            return;
        }

        // -----------------------------
        // OPAQUE BLOCK (IMPROVED DEPTH SYSTEM)
        // -----------------------------

        mat.transparent = false;
        mat.alphaTest = 0;

        mat.roughness = 1;
        mat.metalness = 0;
        mat.envMapIntensity = 0.25;

        mat.depthWrite = true;
        mat.depthTest = true;

        mat.side = THREE.DoubleSide;

        // 🌍 SAFE DEPTH VARIATION (texture-preserving)
        if (mat.map) {

            // subtle brightness shift (DO NOT overwrite color)
            const brightness = 0.92 + Math.random() * 0.08;

            mat.color = mat.color.clone().multiplyScalar(brightness);
        }

        mat.needsUpdate = true;

    });
}