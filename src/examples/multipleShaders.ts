import { Color, Vector3 } from "three";
import { World, newComponent, extend } from "../ecs/index";
import { MaterialC } from "../ecs/components";
import { RenderSystem } from "../systems/core/RenderSystem";
import { StandardPrimitiveSystem } from "../systems/core/StandardPrimitiveSystem";
import { Object3DSystem } from "../systems/core/Object3DSystem";
import { MaterialSystem } from "../systems/core/MaterialSystem";
import { OrbitControlsSystem } from "../systems/core/OrbitControlsSystem";
import { StandardPrimitive } from "../ecs/archetypes";
import { basic, basic2 } from "../shaders/index";

/** Adds a cube. Nothing more to say :) */
export default async () => {
  const world = new World();

  const Mat1 = newComponent(MaterialC, {
    shader: basic,
    color1: new Color(0, 1, 0),
    color2: new Color(1, 0, 0),
  });

  const Mat2 = newComponent(MaterialC, {
    shader: basic2,
  });

  const box1 = extend(
    StandardPrimitive({ type: "Box", position: new Vector3(1, 0, 0), name: 'Box1' }),
    [Mat1]
  );
  const box2 = extend(
    StandardPrimitive({ type: "Box", position: new Vector3(-1, 0, 0), name: 'Box2' }),
    [Mat2]
  );

  world.addEntities([box1, box2]);

  world
    .registerSystem(RenderSystem)
    .registerSystem(Object3DSystem)
    .registerSystem(StandardPrimitiveSystem)
    .registerSystem(OrbitControlsSystem)
    .registerSystem(MaterialSystem);

  return world;
};
