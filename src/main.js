import { repeat } from "lit-html/directives/repeat";
import { styleMap } from "lit-html/directives/style-map";
import { guard } from "lit-html/directives/guard";
import { html, render } from "lit-html";

const TableCell = (t) => guard(t, () => html`<td class="TableCell" @click=${() => { console.log(t); }}>${t}</td>`);
const TableRow = (s) => guard(s, () => html`
  <tr class=${s.active ? "TableRow active" : "TableRow"} data-id=${s.id}>
    ${TableCell(`#${s.id}`)}
    ${s.props.map((item) => TableCell(item))}
  </tr>`);
const Table = (p) => guard(p, () => html`
  <table class="Table">
    <tbody>
      ${repeat(p.items, (item) => item.id, TableRow)}
    </tbody>
  </table>`);
const AnimBox = (s) => guard(s, () => html`
  <div class="AnimBox" data-id=${s.id} style=${
  styleMap({
    "background": "rgba(0,0,0," + (0.5 + ((s.time % 10) / 10)) + ")",
    "border-radius": (s.time % 10) + "px",
  })
  }></div>`);
const Anim = (p) => guard(p, () => html`<div class="Anim">${repeat(p.items, (item) => item.id, AnimBox)}</div>`);
const TreeLeaf = (p) => guard(p, () => html`<li class="TreeLeaf">${p.id}</li>`);
const TreeNode = (p) => guard(p, () => html`
  <ul class="TreeNode">
    ${repeat(p.children, (n) => n.id, (n) => n.container ? TreeNode(n) : TreeLeaf(n))}
  </ul>`);
const Tree = (p) => guard(p, () => html`<div class="Tree">${TreeNode(p.root)}</div>`);

/**
 * Uncomment to disable SCU optimization:
 */
// const TableCell = (t) => html`<td class="TableCell" @click=${() => { console.log(t); }}>${t}</td>`;
// const TableRow = (s) => html`
//   <tr class=${s.active ? "TableRow active" : "TableRow"} data-id=${s.id}>
//     ${TableCell(`#${s.id}`)}
//     ${s.props.map((item) => TableCell(item))}
//   </tr>`;
// const Table = (p) => html`
//   <table class="Table">
//     <tbody>
//       ${repeat(p.items, (item) => item.id, TableRow)}
//     </tbody>
//   </table>`;
// const AnimBox = (s) => html`
//   <div class="AnimBox" data-id=${s.id} style=${
//   styleMap({
//     "background": "rgba(0,0,0," + (0.5 + ((s.time % 10) / 10)) + ")",
//     "border-radius": (s.time % 10) + "px",
//   })
//   }></div>`;
// const Anim = (p) => html`<div class="Anim">${repeat(p.items, (item) => item.id, AnimBox)}</div>`;
// const TreeLeaf = (p) => html`<li class="TreeLeaf">${p.id}</li>`;
// const TreeNode = (p) => html`
//   <ul class="TreeNode">
//     ${repeat(p.children, (n) => n.id, (n) => n.container ? TreeNode(n) : TreeLeaf(n))}
//   </ul>`;
// const Tree = (p) => html`<div class="Tree">${TreeNode(p.root)}</div>`;

function route(state) {
  switch (state.location) {
    case "table": return Table(state.table);
    case "anim": return Anim(state.anim);
    default: return Tree(state.tree);
  }
}

const Main = (state) => html`<div class="Main">${state ? route(state) : null}</div>`;

uibench.init("lit-html", "1.0.0");

document.addEventListener("DOMContentLoaded", (e) => {
  const container = document.querySelector("#App");

  uibench.run(
    (state) => {
      render(Main(state), container);
    },
    (samples) => {
      render(html`<pre>${JSON.stringify(samples, null, " ")}</pre>`, container);
    }
  );
});
