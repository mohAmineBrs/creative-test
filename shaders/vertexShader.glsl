uniform float uTime;
uniform float uWaveSpeed;
uniform float uTwistAngle;
uniform vec2 uOffset;

varying vec2 vUv;

float PI = 3.141592653589793238;

vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
  position.x = position.x + (sin(uv.y * PI) * offset.x);
  position.y = position.y + (sin(uv.x * PI) * offset.y);
  return position;
}

mat2 get2dRotateMatrix(float _angle) {
  return mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle));
}

void main() {
  vUv = uv;
  vec3 pos = position;

  // Wavy Flag Effect 
  pos.z += sin(pos.x * 10. - uTime * uWaveSpeed) * 0.05;
  pos.z += sin(pos.y * 1. - uTime * uWaveSpeed) * 0.1;

  // Twist Effect
  float angle = sin(pos.y + uTime * 5.) * (0.1 * uTwistAngle);
  mat2 rotateMatrix = get2dRotateMatrix(angle);
  pos.xz *= rotateMatrix;

  vec3 finalPos = deformationCurve(pos, uv, uOffset);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.);
}
