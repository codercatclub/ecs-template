import { Object3DSystem } from "../systems/core/Object3DSystem";
import { RenderSystem } from "../systems/core/RenderSystem";
import { CameraSystem } from "../systems/core/CameraSystem";
import { Camera, StandardPrimitive } from "../ecs/archetypes";
import { StandardPrimitiveSystem } from "../systems/core/StandardPrimitiveSystem";
import { World } from "../ecs/index";
import { Vector3 } from "three";
import { IntervalSpawnSystem } from "../systems/core/IntervalSpawnSystem";
import { OrbitControlsSystem } from "../systems/core/OrbitControlsSystem";

/** Programmatically and many entities to the scene */
export default async () => {
  const world = new World();

  const cam = Camera(new Vector3(50, 0, 0));

  world.addEntity(cam);

  const r = 3; // radius of the spiral
  const spacing = 0.4; // lower - closer object on the curve

  for (let i = 0; i < 50; i++) {
    const type = i % 2 === 0 ? "Box" : "Sphere";

    const prim = StandardPrimitive({
      type,
      position: new Vector3(Math.cos(i * spacing) * r, i, Math.sin(i * spacing) * r),
    });

    world.addEntity(prim);
  }

  world
    .registerSystem(RenderSystem)
    .registerSystem(Object3DSystem)
    .registerSystem(StandardPrimitiveSystem)
    .registerSystem(IntervalSpawnSystem)
    .registerSystem(CameraSystem)
    .registerSystem(OrbitControlsSystem);

  return world;
};
