interface Shader {
    vert: string;
    frag: string;
}

export const basic: Shader = {
    vert: require(`./BasicVert.glsl`),
    frag: require(`./BasicFrag.glsl`),
}

export const basic2: Shader = {
    vert: require(`./Basic2Vert.glsl`),
    frag: require(`./Basic2Frag.glsl`),
}
