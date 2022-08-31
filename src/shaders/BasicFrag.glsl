// Basic shader
uniform float time;

uniform vec3 colorA;
uniform vec3 colorB;

varying vec3 vUv;
varying vec3 vPos;

void main() {
	gl_FragColor = vec4(abs(sin(vPos + time)), 1.0);
}