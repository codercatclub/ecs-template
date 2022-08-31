import { System } from "../../ecs/index";
import { TransformC, Object3DC, MaterialC } from "../../ecs/components";
import { applyQuery, Entity, World } from "../../ecs/index";
import {
  Mesh,
  UniformsUtils,
  MeshStandardMaterial,
} from "three";
import { getComponent } from "./utils";

interface MaterialSystem extends System {
  world: World | null;
  processEntity: (ent: Entity) => void;
  shaders: THREE.Shader[];
  updateUniforms: (time: number, timeDelta: number) => void;
}

export const MaterialSystem: MaterialSystem = {
  type: "MaterialSystem",
  world: null,
  shaders: [],
  queries: [TransformC, Object3DC, MaterialC],

  init: function (world) {
    this.world = world;
    this.entities = applyQuery(world.entities, this.queries);
    this.entities.forEach(this.processEntity.bind(this));
  },

  processEntity: function (ent) {
    if (!this.world) return;
    const { shader, color1, color2 } = getComponent(ent, MaterialC);
    const { object3d: parent } = getComponent(ent, Object3DC);

    const uniforms = {
      colorB: { type: "vec3", value: color1 },
      colorA: { type: "vec3", value: color2 },

      time: { type: "f", value: 0 },
    };

    const material = new MeshStandardMaterial()

    material.onBeforeCompile = (s) => {
      s.uniforms = UniformsUtils.merge([uniforms, s.uniforms]);

      s.vertexShader = shader.vert;
      s.fragmentShader = shader.frag;

      this.shaders.push(s);
    };

    // To fix issue where same shader assign to multiple object do to cashing
    // See https://stackoverflow.com/questions/68478208/applying-two-different-fragment-shaders-to-two-different-materials-of-the-same/73554098#73554098
    material.customProgramCacheKey = () => ent.id.toString();

    parent?.traverse((obj) => {
      if (obj.type === "Mesh") {
        const o = obj as Mesh;
        o.material = material;
      }
    });
  },

  onEntityAdd: function (ent) {
    const entities = applyQuery([ent], this.queries);
    entities.forEach(this.processEntity.bind(this));
  },

  updateUniforms: function (time) {
    this.shaders.forEach((s) => {
      s.uniforms["time"].value = time;
    });
  },

  tick: function (time, timeDelta) {
    this.updateUniforms(time, timeDelta);
  },
};
