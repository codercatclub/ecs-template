import { Color } from "three";
import { World, newEntity, newComponent } from "../ecs/index";
import { TransformC, GeometryC, Object3DC, MaterialC } from "../ecs/components";
import { RenderSystem } from "../systems/core/RenderSystem";
import { StandardPrimitiveSystem } from "../systems/core/StandardPrimitiveSystem";
import { Object3DSystem } from "../systems/core/Object3DSystem";
import { MaterialSystem } from "../systems/core/MaterialSystem";
import { OrbitControlsSystem } from "../systems/core/OrbitControlsSystem";
import { basic } from "../shaders/index";

/** Adds a cube. Nothing more to say :) */
export default async () => {
  const world = new World();

  // Make custom material component that use DefaultFrag and DefaultVert shaders.
  const MatC = newComponent(MaterialC, {
    shader: basic,
    color1: new Color(0, 1, 0),
    color2: new Color(1, 0, 0),
  });

  const box = newEntity([TransformC, GeometryC, Object3DC, MatC]);

  world.addEntity(box);

  world
    .registerSystem(RenderSystem)
    .registerSystem(Object3DSystem)
    .registerSystem(StandardPrimitiveSystem)
    .registerSystem(OrbitControlsSystem)
    .registerSystem(MaterialSystem);

  return world;
};
