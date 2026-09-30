"use client";

// Display-referred charcoal: scene exposure and lights must not wash out
// the dark palette. Normals add restrained, view-dependent highlights.
const vertexShader = `
  #include <common>
  #include <morphtarget_pars_vertex>
  varying vec3 surfaceNormal;
  varying vec3 viewDirection;
  void main() {
    #include <morphinstance_vertex>
    #include <beginnormal_vertex>
    #include <morphnormal_vertex>
    #include <begin_vertex>
    #include <morphtarget_vertex>
    vec4 viewPosition = modelViewMatrix * vec4(transformed, 1.0);
    surfaceNormal = normalize(normalMatrix * objectNormal);
    viewDirection = normalize(-viewPosition.xyz);
    gl_Position = projectionMatrix * viewPosition;
  }
`;
const fragmentShader = `
  varying vec3 surfaceNormal;
  varying vec3 viewDirection;
  void main() {
    vec3 n = normalize(surfaceNormal);
    vec3 eye = normalize(viewDirection);
    float facing = max(dot(n, eye), 0.0);
    vec3 reflection = reflect(-eye, n);
    vec3 lightDirection = normalize(vec3(-0.35, 0.65, 1.0));
    float alignment = max(dot(reflection, lightDirection), 0.0);
    float glint = pow(alignment, 95.0);
    float sheen = pow(alignment, 9.0);
    vec3 edge = vec3(28.0, 28.0, 34.0) / 255.0;
    vec3 center = vec3(34.0, 34.0, 41.0) / 255.0;
    vec3 charcoal = mix(edge, center, smoothstep(0.0, 0.9, facing));
    vec3 finish = charcoal + vec3(0.025 * sheen + 0.20 * glint);
    gl_FragColor = vec4(finish, 1.0);
  }
`;

export function DarkSculptureMaterial() {
  return (
    <shaderMaterial
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      toneMapped={false}
    />
  );
}
