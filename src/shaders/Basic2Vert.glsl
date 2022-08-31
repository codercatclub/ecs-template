varying vec3 vPos;
varying vec3 vUv;

void main() {
  vPos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}