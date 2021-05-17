/* @flow */
/* 真实 dom 节点工厂方法 */

import { namespaceMap } from 'web/util/index'

/* 创建元素节点 */
export function createElement (tagName: string, vnode: VNode): Element {
  const elm = document.createElement(tagName)
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple')
  }
  return elm
}

/* 创建元素命名空间 */
export function createElementNS (namespace: string, tagName: string): Element {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

/* 创建文本节点 */
export function createTextNode (text: string): Text {
  return document.createTextNode(text)
}

/* 创建注释节点 */
export function createComment (text: string): Comment {
  return document.createComment(text)
}

/* 插入到节点之前 */
export function insertBefore (parentNode: Node, newNode: Node, referenceNode: Node) {
  parentNode.insertBefore(newNode, referenceNode)
}

/* 移除子节点 */
export function removeChild (node: Node, child: Node) {
  node.removeChild(child)
}

/* 添加子节点 */
export function appendChild (node: Node, child: Node) {
  node.appendChild(child)
}

/* 获取父节点 */
export function parentNode (node: Node): ?Node {
  return node.parentNode
}

/* 获取下一个兄弟节点 */
export function nextSibling (node: Node): ?Node {
  return node.nextSibling
}

/* 节点标签 */
export function tagName (node: Element): string {
  return node.tagName
}

/* 设置节点文本内容 */
export function setTextContent (node: Node, text: string) {
  node.textContent = text
}

/* 设置节点属性 scopeId */
export function setStyleScope (node: Element, scopeId: string) {
  node.setAttribute(scopeId, '')
}
