
import { Curtains } from 'curtainsjs';

export default function init() {
  console.log('initializing..');

  const curtains = new Curtains({
    container: 'canvas',
    watchScroll: false,
  });

  curtains.onError(() => {
    document.body.classList.add('no-curtains');
  });

  const planeElement = document.getElementsByClassName('plane')[0];

  const params = {
    vertexShaderID: 'plane-vs',
    fragmentShaderID: 'plane-fs',
    uniforms: {
      time: {
        name: 'uTime',
        type: "1f",
        value: 0,
      },
      timeScale: {
        name: 'uTimeScale',
        type: '1f',
        value: 1,
      },
      resolution: {
        name: 'uResolution',
        type: '2f',
        value: [100.0, 100.0],
      },
      scale: {
        name: 'uScale',
        type: '1f',
        value: 2.0,
      },
    },
  };

  var plane = curtains.addPlane(planeElement, params);

  if (plane) {
    plane.onRender(() => {
      plane.uniforms.time.value++;
    });
  } else {
    console.log('plane is falsy!');
  }
}
