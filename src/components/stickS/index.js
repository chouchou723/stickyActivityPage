import throttle from './throttle'
let listenAction
let supportCSSSticky

const getBindingConfig = binding => {
  const params = binding.value || {}
  let stickyTop = params.stickyTop || 0
  let zIndex = params.zIndex || 1000
  let disabled = params.disabled
  return { stickyTop, zIndex, disabled}
}

const getInitialiConfig = el => {
  return {
    zIndex: el.style.zIndex,
  }
}

const unwatch = () => {
  window.removeEventListener('scroll', listenAction)
}
const watch = () => {
  window.addEventListener('scroll', listenAction)
}

let bindingConfig = {}
let initialConfig = {}

export default {
  bind(el, binding) {
    bindingConfig = getBindingConfig(binding)
    initialConfig = getInitialiConfig(el)
    const { disabled, stickyTop, zIndex } = bindingConfig

    if (disabled) return

    const elStyle = el.style
    elStyle.position = '-webkit-sticky'
    elStyle.position = 'sticky'

    let childStyle = el.firstElementChild.style
    // test if the browser support css sticky
    supportCSSSticky = ~elStyle.position.indexOf('sticky')

    if (supportCSSSticky) {
      elStyle.top = `${stickyTop}px`
      elStyle.zIndex = zIndex
    } else {
      elStyle.position = ''
      childStyle.cssText = `left: 0; right: 0; top: ${stickyTop}px; z-index: ${zIndex}; ${childStyle.cssText}`
    }

    let active = false
    const sticky = () => {
      if (supportCSSSticky || active) return//true之后在scroll时就不会再执行,避免对此执行
      if (!elStyle.height) {
        elStyle.height = `${el.offsetHeight}px`//没写高度自动将offsetHeigh赋值
      }
      if (childStyle) {
        childStyle.position = 'fixed'
      }
      active = true//true之后在scroll时就不会再执行
    }

    const reset = () => {
      if (supportCSSSticky || !active) return
      childStyle.position = 'static'
      active = false
    }

    // let htmlFZ = document.getElementsByTagName("html")[0].style.fontSize;
    // let basic = htmlFZ.split('px')[0];
    // let basicH = 1.6 * basic + 1.15 * basic;
    // const changeCss = (el,type) =>{
    //   let a = document.getElementById(el);
    //   let ii = document.getElementById('ii');
    //   let cc = document.getElementById('cc');
    //   let aa = document.getElementById('aa');
    //   if(type==='else'){
    //     ii.className =''
    //     cc.className =''
    //     aa.className =''
    //     return
    //   }
    //   if(a.className.indexOf('ticketAct')<0){
    //     ii.className =''
    //     cc.className =''
    //     aa.className =''
    //     a.className +=' ticketAct'
    //   }
    // }
    listenAction = throttle(() => {
      // let ar = document.getElementById('intro').getBoundingClientRect();
      // let br = document.getElementById('comment').getBoundingClientRect();
      // let cr = document.getElementById('actvity').getBoundingClientRect();

      // let aT = ar.top;
      // let aB = ar.bottom;

      // let bT = br.top;
      // let bB = br.bottom;

      // let cT = cr.top;
      // let cB = cr.bottom;
      
      // if(aT>basicH||aB-basicH>20){
      //   changeCss('ii')
      // }else if(bT-basicH<40&&bB-basicH>20){
      //   changeCss('cc')
      // }else if(cT-basicH<40&&cB-basicH>20){
      //   changeCss('aa')        
      // }else{
      //   changeCss('','else') 
      // }

      const offsetTop = el.getBoundingClientRect().top
      if (offsetTop <= stickyTop) {//当前距离视图顶部的距离 小于等于设定的sticky距离时
        return sticky()
      }
      reset()
    })

    watch()
  },

  unbind: unwatch,

  update(el, binding) {
    bindingConfig = getBindingConfig(binding)
    const { stickyTop, zIndex } = bindingConfig

    let childStyle = el.firstElementChild.style
    if (supportCSSSticky) {
      el.style.top = `${stickyTop}px`
      el.style.zIndex = zIndex
    } else {
      childStyle.top = `${stickyTop}px`
      childStyle.zIndex = zIndex
    }

    if (bindingConfig.disabled) {
      if (supportCSSSticky) {
        el.style.position = ''
      } else {
        childStyle.position = ''
        childStyle.top = ''
        childStyle.zIndex = initialConfig.zIndex
        unwatch()
      }
      return
    }

    if (supportCSSSticky) {
      el.style.position = '-webkit-sticky'
      el.style.position = 'sticky'
    } else {
      watch()
    }
  },
}