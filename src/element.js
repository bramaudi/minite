export const createElement = ({ tag, attrs, children }) => {

  const checkTag = (t) => tag === t

  // If tag are 'x' it became fragment
  var el = tag === 'x'
    ? new DocumentFragment()
    : document.createElement(tag)

  // Check if tag is svg related
  if (
    checkTag('path') ||
    checkTag('svg') ||
    checkTag('use') ||
    checkTag('g')
  ) {
    el = document.createElementNS('http://www.w3.org/2000/svg', tag)
  }

  // el = Object.assign(el, attrs)
  for (const prop in attrs) {
    // Add Event Listener
    const event = prop.match(/^on(.*)/)
    if (event) {
      el.addEventListener(event[1].toLowerCase(), attrs[prop])
    } else {
      if (tag !== 'x') {
        el.setAttribute(prop === 'className' ? 'class' : prop, attrs[prop])
      }
    }
  }

  if (children) {
    // Check if childrens is definitely inside array
    children.forEach(child => {
      if (Array.isArray(child)) {
        children = child
      }
    })
    // Append childrens
    children.map(child => {
      el.append(typeof child === 'object' ? createElement(child) : child)
    })
  }

  return el
}