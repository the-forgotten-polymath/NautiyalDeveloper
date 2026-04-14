uniform float uTime;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 pos = position;
  pos.y += sin(pos.x * 0.5 + uTime) * 0.15;
  pos.y += sin(pos.z * 0.3 + uTime * 0.8) * 0.2;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
