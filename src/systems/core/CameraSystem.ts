import { CamC, Object3DC, TransformC } from "../../ecs/components";
import { applyQuery } from "../../ecs/index";
import * as THREE from "three";
import { System } from "../../ecs/index";
import { RenderSystem } from "./RenderSystem";
import { getComponent } from "./utils";

export const CameraSystem: System = {
  type: "CameraSystem",
  queries: [CamC, TransformC, Object3DC],

  init: function (world) {
    this.entities = applyQuery(world.entities, this.queries);

    this.entities.forEach((ent) => {
      const camData = getComponent(ent, CamC);
      const { position } = getComponent(ent, TransformC);
      const { object3d } = getComponent(ent, Object3DC);

      const cam = new THREE.PerspectiveCamera(
        camData.fov,
        camData.aspect,
        camData.near,
        camData.far
      );

      cam.position.x = position.x;
      cam.position.y = position.y;
      cam.position.z = position.z;

      object3d?.add(cam)
      ent.components.set(CamC.type, cam);

      const renderSystem = world.getSystem<RenderSystem>(RenderSystem.type);
      renderSystem?.setCamera(cam);
    });
  },
};
