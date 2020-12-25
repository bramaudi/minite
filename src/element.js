/**
 * Check if tag name is svg
 * @param {String} tagName
 */
function isSVG(tagName) {
  const patt = new RegExp('^' + tagName + '$', 'i')
  const SVGTags = ['path', 'svg', 'use', 'g']
  return SVGTags.some(tag => patt.test(tag))
}

/**
 * Inline style
 * @param {Object} styles
 */
function objectToStyleString(styles) {
  return Object.keys(styles)
    .map(prop => `${prop}: ${styles[prop]}`)
    .join(';')
}

export const createElement = function (tagName, attrs, ...children) {

  // Flexibility, can skip attrs and pass as child
  if (Array.isArray(attrs)) children = attrs
  else if (typeof attrs === 'string') children.push(attrs)

  // For re-usable / nested jsx component
  if (typeof tagName === 'function') return tagName(attrs, children)
  
  // If tagName are 'x' it became fragment
  if (tagName === 'x') return children
 
  // Lowercasing all attrs key, onClick -> onclick
  if (typeof attrs === 'object') {
    for (const key in attrs) {
      attrs[key.toLocaleLowerCase()] = attrs[key]
    }
  }
 
  var elem = Object.assign(
    document.createElement(tagName),
    typeof attrs === 'object' ? attrs : {}
  )

  if (isSVG(tagName)) {
    elem = document.createElementNS('http://www.w3.org/2000/svg', tagName)

    for (const prop in attrs) {
      if (attrs.hasOwnProperty(prop)) {
        elem.setAttribute(prop, attrs[prop])
      }
    }
  }

  // Apply style
  if (attrs && attrs.hasOwnProperty('style')) {
    elem.style = objectToStyleString(attrs['style'])
  }
 
  // Append childrens
  for (const child of children) {
    if (Array.isArray(child)) elem.append(...child)
    else elem.append(child)
  }

  return elem

}
