const tree = docu.jsxEntity(docu.DocuFragment, null);
docu.append(document.getElementById('display'), tree);
document.getElementById('content').append(docu.jsxEntity(InsertFeatureButton, {
  parentNode: tree
}));
function selectFeature(block) {
  block.replaceChildren();
  block.append(docu.jsxEntity("button", null, "choice 1"));
  block.append(docu.jsxEntity("button", null, "choice 2"));
}
function InsertFeatureButton({
  parentNode,
  previousNode
}) {
  const block = docu.jsxEntity("div", {
    className: "feature-block"
  }, docu.jsxEntity("button", {
    onClick: () => selectFeature(block)
  }, "+ add feature"));
  return block;
}