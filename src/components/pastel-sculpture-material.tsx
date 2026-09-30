"use client";

const vertexShader = `
  #include <common>
  #include <morphtarget_pars_vertex>
  varying vec3 surfaceNormal;
  varying vec3 viewDirection;
  varying vec3 pastelColor;
  void main() {
    #include <morphinstance_vertex>
    #include <beginnormal_vertex>
    #include <morphnormal_vertex>
    #include <begin_vertex>
    #include <morphtarget_vertex>
    vec4 viewPosition = modelViewMatrix * vec4(transformed, 1.0);
    surfaceNormal = normalize(normalMatrix * objectNormal);
    viewDirection = normalize(-viewPosition.xyz);
    pastelColor = color;
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const fragmentShader = `
  varying vec3 surfaceNormal;
  varying vec3 viewDirection;
  varying vec3 pastelColor;
  void main() {
    // Geometry colors are linear; write display colors explicitly, independent
    // of exposure and scene lights, just as in the dark material.
    vec3 displayColor = mix(12.92 * pastelColor,
      1.055 * pow(max(pastelColor, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055,
      step(vec3(0.0031308), pastelColor));
    vec3 n = normalize(surfaceNormal);
    vec3 eye = normalize(viewDirection);
    float facing = max(dot(n, eye), 0.0);
    vec3 reflected = reflect(-eye, n);
    float highlight = pow(max(dot(reflected, normalize(vec3(-0.35, 0.65, 1.0))), 0.0), 110.0);
    vec3 base = mix(displayColor, vec3(0.96, 0.95, 0.98), 0.12);
    vec3 finish = base * (0.98 + 0.02 * facing) + vec3(highlight * 0.13);
    gl_FragColor = vec4(finish, 1.0);
  }
`;

export function PastelSculptureMaterial() {
  return <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} vertexColors toneMapped={false} />;
}
