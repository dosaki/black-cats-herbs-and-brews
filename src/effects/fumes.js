export const makeFumesShader = (r,g,b) => {
    return `#version 300 es
#define oct 5
precision highp float;uniform float time;uniform vec2 vp;in vec2 uv;out vec4 fragcolor;float rand(vec2 p){return fract(sin(dot(p.xy,vec2(1.,300.)))*43758.5453123);}
float noise(vec2 p){vec2 i=floor(p);vec2 f=fract(p);float a=rand(i);float b=rand(i+vec2(1.0,0.0));float c=rand(i+vec2(0.0,1.0));float d=rand(i+vec2(1.0,1.0));vec2 u=f*f*(3.0-2.0*f);return mix(a,b,u.x)+(c-a)* u.y*(1.0-u.x)+(d-b)*u.x*u.y;}
float fbm(vec2 p){float value=0.;float amplitude=.4;float frequency=0.;for (int i=0;i<oct;i++){value += amplitude*noise(p);p*=2.;amplitude*=.4;}return value;}
void main(){vec2 p=uv.xy;p.x*=vp.x/vp.y;float gradient=mix(p.y*.2+.1,p.y*1.2+.9,fbm(p));float speed=0.2;float details=9.;float force=.9;float shift=.5;vec2 fast=vec2(p.x,p.y-time*speed)*details;float ns_a=fbm(fast);float ns_b=force*fbm(fast+ns_a+time)-shift;float nns=force*fbm(vec2(ns_a,ns_b));float ins=fbm(vec2(ns_b,ns_a));vec3 c1=mix(vec3(.0,.0,.0),vec3(${r/255},${g/255},${b/255}),ins+shift);fragcolor=vec4(c1+vec3(ins-gradient),0.5);}`;
}

export class WebGLHandler {
  vertexShaderSource = `#version 300 es
precision mediump float;const vec2 pos[6]=vec2[6](vec2(-1.0,-1.0),vec2(1.0,-1.0),vec2(-1.0,1.0),vec2(-1.0,1.0),vec2(1.0,-1.0),vec2(1.0,1.0));out vec2 uv;void main(){uv=pos[gl_VertexID];gl_Position=vec4(pos[gl_VertexID],0.0,1.0);}`;

  constructor(canvas, fragmentShaderSource) {
    this.cn = canvas;
    this.gl = canvas.getContext("webgl2");
    this.gl.colorMask(true, true, true, false);
    this.startTime = Date.now();
    this.program = this.gl.createProgram();
    this.compileShader(this.vertexShaderSource, this.gl.VERTEX_SHADER);
    this.compileShader(fragmentShaderSource, this.gl.FRAGMENT_SHADER);
    this.gl.linkProgram(this.program);
    this.gl.useProgram(this.program);

    this.timeLocation = this.gl.getUniformLocation(this.program, "time");
    this.resolutionLocation = this.gl.getUniformLocation(this.program, "vp");

    this.render();
  }

  compileShader(source, type) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error(this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return null;
    }
    return this.gl.attachShader(this.program, shader);
  }

  render = () => {
    this.gl.uniform1f(this.timeLocation, (Date.now() - this.startTime) / 1000);
    this.gl.uniform2fv(this.resolutionLocation, [
      this.cn.width,
      this.cn.height
    ]);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    window.requestAnimationFrame(this.render);
  };
}

