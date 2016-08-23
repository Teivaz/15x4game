/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=1b7641b80f0eac8e11b0bbda5cc0a649)
 * Config saved to config.json and https://gist.github.com/1b7641b80f0eac8e11b0bbda5cc0a649
 */
if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}
+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);


/*var Billet = React.createClass({
    constructor: function(){},
    
    render: function() {
        var code = '#1'
        return (
            <div className='title row3 dwg-no'>
                <TitleElement text={code} />
            </div>

<div className="flex-element flex-container-column ${secret_class}" id="${key}_container">
    <div className="flex-element flex-container-row ">
    ${key.capitalizeFirstLetter()}
    <div class="${secret_class}">: <span id="${key}level">${this.level}</span></div>
    </div>
    <div class="flex-element"><button onclick="${address}('${key}');">Up: ${price}</button></div>
    <div class="flex-element">${this.text}</div>
</div>
        )
    }
})
*/

function Billet(name, base_cost_array, cost_grow_rate , text) {
    this.name = name;
    this.base_cost_array = base_cost_array;
    this.cost_grow_rate = cost_grow_rate;
    this.text = text;
    this.level = 1;

    this.upgrade = function() {
        if (!Player.checkEnthusiasm()) return false;

        if (Player.withdrawArray(this.getUpgradeCost())) {
            this.level++;
            Player.enthusiasm--;
            draw_all();
        }
    };

    this.getUpgradeCost = function() {
        var cost = {};
        for (var key in this.base_cost_array) {
            cost[key] = this.base_cost_array[key] * Math.pow(this.level, this.cost_grow_rate);

        }
        return cost;
    };

    this.getHTML = function(key, secret_class, address) {
        var upgrade_cost = this.getUpgradeCost();
        var price = [];
        for (var resource_name in upgrade_cost) {
            price.push(`${upgrade_cost[resource_name].toFixed(2)} ${resource_name}`);
        }
        price = price.join(', ');

        var html = `<div class="flex-element flex-container-column ${secret_class}" id="${key}_container">
                        <div class="flex-element flex-container-row ">
                            ${key.capitalizeFirstLetter()}
                            <div class="${secret_class}">: <span id="${key}level">${this.level}</span></div>
                        </div>
                        <div class="flex-element"><button onclick="${address}('${key}');">Up: ${price}</button></div>
                        <div class="flex-element">${this.text}</div>
                    </div>`;

        return html;
    };

    return this;
}



function Workplace(name, base_cost_array, cost_grow_rate, text, custom_modification) {
    Billet.apply(this, arguments);
    this.custom_modification = custom_modification;

    this.workers = 0;


    this.increase = function() {
        if (Player.volunteers < 1) {
            message('Not enough free volunteers');
        } else if (this.workers + 1 > Civilization.updates.teamwork.level) {
            message('Not enough teamwork');
        } else {
            Player.volunteers--;
            this.workers++;
            draw_all();
        }
    };

    this.decrease = function() {
        if (this.workers >= 1) {
            Player.volunteers++;
            this.workers--;
            draw_all();
            //    message('One volunteer from the Department of ' + this.name + ' was released.');
        }
        else {
            message('Not enough volunteers in department');
        }
    };

    this.getEfficiency = function() {
        var custom = (typeof(this.custom_modification) === 'function') ? this.custom_modification() : 1;
        return Civilization.getHappiness() * this.workers * (1 + (0.1 * this.level)) * custom;
    };

    this.getProductivity = function() {
        var custom = 1;
        if (typeof(this.custom_modification) === 'function') {
            custom = this.custom_modification();
        }

        var adjustment = 10 / 60 / 60;
        //   console.log(this.name, rate, adjustment);
        return this.getEfficiency() * this.base_rate * adjustment * custom;
    };


    this.getHTML = function(key, secret_class, address) {
        var upgrade_cost = this.getUpgradeCost();
        var price = [];
        for (var resource_name in upgrade_cost) {
            price.push(`${upgrade_cost[resource_name].toFixed(2)} ${resource_name}`);
        }
        price = price.join(', ');

        var season_bonus_html = '';
        if (typeof(this.custom_modification) === 'function') {
            var season_bonus = this.custom_modification() ;
            if (season_bonus !== 1) {
                season_bonus_html += `
    <div class="flex-element">
        Season bonus: ${season_bonus*100}%
    </div>`
            }
        }

        var html = `    
    <div class="flex-element flex-container-column ${secret_class}" id="${key}_container">
        <div class="flex-element flex-container-row ">
            ${key.capitalizeFirstLetter()}
            <div class="${secret_class}">: <span id="${key}_level">${this.level}</span></div>
        </div>
        ${season_bonus_html}
    <div class="flex-element">
        <button onclick="${address}('${key}');">Up: ${price}</button>
    </div>
    <div class="flex-element">
        <span id="${key}_volunteers">Workers: ${this.workers}/${Civilization.updates.teamwork.level}</span>
        <button class = "" onclick="Civilization.increase('${key}');"> + </button>
        <button class = "" onclick="Civilization.decrease('${key}');"> - </button>
    </div>
    
    <div class="flex-element">
        Efficiency: <span id="${key}_productivity"> 
        ${this.getEfficiency().toFixed(2)}</span>
    </div>
    
    <div class="flex-element">${this.text}</div></div>`;

        return html;
    };

    return this;
}

/*
Workplace.getHTML = function(key, secret_class, address) {
    var upgrade_cost = this.getUpgradeCost();
    var price = [];
    for (var resource_name in upgrade_cost) {
        price.push(`${upgrade_cost[resource_name].toFixed(2)} ${resource_name}`);
    }
    price = price.join(', ');

    var html = `
    <div class="flex-element flex-container-column ${secret_class}" id="${key}_container">
        <div class="flex-element flex-container-row ">
            ${key.capitalizeFirstLetter()}
            <div class="${secret_class}">: <span id="${key}level">${this.level}</span></div>
        </div>
    <div class="flex-element">
        <button onclick="${address}('${key}');">Up: ${price}</button>
    </div>
    <div class="flex-element">
        <span id="${key}_volunteers">Workers: ${this.workers}/${Civilization.updates.teamwork.level}</span>
        <button class = "" onclick="Civilization.increase('${key}');"> + </button>
        <button class = "" onclick="Civilization.decrease('${key}');"> - </button>
    </div>
    <div class="flex-element">${work.text}</div></div>`;

    return html;
};
*/





function message(text) {
    if(text == "A new day."){LogPanel.day++;}
    //else if (text.includes("Balance ratio")) {}
    else{LogPanel.messages.push(new LogMessage(false,text));}
    console.log(text);
    //console.log(LogPanel.messages);
}




function is_reached() {
    var founded = 0;
    for (var key in this.requires) {
        for (var obj_key in objectives.db) {
            if (objectives.db[obj_key].reached && objectives.db[obj_key].name == this.requires[key]) {
                founded++;
            }
        }
        for (var ach_key in badges.db) {
            if (badges.db[ach_key].reached && badges.db[ach_key].name == this.requires[key]) {
                founded++;
            }
        }
    }

    return (this.requires.length == founded);
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function random(min, max) {
    return Math.random() * (max - min) + min;
}


/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() knowledge give you a non-uniform distribution!
 */
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};



// which best?)
function sum( obj ) {
    var sum = 0;
    for( var el in obj ) {
        if( obj.hasOwnProperty( el ) ) {
            sum += parseFloat( obj[el] );
        }
    }
    return sum;
}

// which best?)
function sum( obj ) {
    return Object.keys( obj )
        .reduce( function( sum, key ){
            return sum + parseFloat( obj[key] );
        }, 0 );
}







var resources = ['likes', 'design', 'money', 'ideas'];

var space_resources = ['iron', 'oil', 'uranium', 'iridium'];

var skill_to_resource = {'writing': 'likes', 'drawing': 'design', 'programming': 'money', 'management': 'ideas'};

var resources_rates = {'likes': 1000, 'design': 100, 'money': 10, 'ideas': 1};

var resources_base_limits = {'likes': 5000, 'design': 500, 'money': 50, 'ideas': 5};

var culture_rate = 1;

var adjustment = 10 / 60 / 60;

var skills_departments = {
    "writing" : 'smm',
    "drawing" : 'design',
    "programming" : 'site',
    "management" : 'docs'
};



function draw_all() {
    function w(element_id, text) {
        document.getElementById(element_id).innerHTML = text;
    }


    //w("time_container", Time.getHTML());

    w("enthusiasm_indicator", Player.enthusiasm.toFixed(2));

    w("day_indicator", LogPanel.day.toFixed());
    w("volunteers_indicator", Player.volunteers.toFixed(2));
    w("volunteers_memory_indicator", Player.volunteers_memory.toFixed(2));

    w("culture_container", Civilization.getHTML());
    w("departments_container", Department.getHTML());
    w("resources_container", Storages.getHTML());
    w("events_container", Event.getHTML());
    w("offered_lecture_container", Lecture.getHTML());

    w("hype", Lecture.hype);   
    w("knowledge_indicator", Player.knowledge.toFixed(2));


    /*var skill_html = "";
    skills.forEach(function(skill) {
        skill_html += '<div class="flex-element flex-container-column" id="' + skill + '">';
        skill_html += '<span id="' + skill + '_indicator">' + skill.capitalizeFirstLetter() + ': ' + Player[skill].toFixed(2) + '/60</span>';
        if (Player.found_secrets.indexOf('self_study') !== -1) skill_html += '<button data-tooltip=\'' + skill + '\' onclick="Player.selfStudy(\'' + skill + '\')">Self-study</button>';
        if (Player.found_secrets.indexOf('books') !== -1) skill_html += '<button data-tooltip=\'' + skill + '\' onclick="Player.books(\'' + skill + '\')">Books</button>';
        if (Player.found_secrets.indexOf('work') !== -1) skill_html += '<button data-tooltip=\'' + skill + '\' onclick="Player.work(\'' + skill + '\')">Work</button>';
        if (Player.found_secrets.indexOf('pet_project') !== -1) skill_html += '<button data-tooltip=\'' + skill + '\' onclick="Player.petProject(\'' + skill + '\')">Pet-project</button>';
        skill_html += '</div>';
    });*/

    w("skills_container", skills.getHTML());
    w("badges_container", badges.getHTML());
    w("objectives_container", objectives.getHTML());
    w("actions_container", actions.getHTML());
    w("startups_container", Startup.getHTML());



    var reputations_html = "";
    ["kindness", "generosity", "thoughtfulness", "innovativeness"].forEach(function(reputation_name) {
        reputations_html += '<div class="flex-element reputation_element">' + reputation_name.capitalizeFirstLetter() + ': ' +
            Player[reputation_name].toFixed(2) + '<span class="flex-element" id="' + reputation_name + '_indicator"></span></div>';
    });
    w("reputations", reputations_html);


    FilterLogs();
    var log_message_html = "";
    log_message_html += "<ul>";
    if(LogPanel.messages.length!=0) {
        for (var i = LogPanel.messages.length-1; i >= 0; i--) {
            if(LogPanel.messages[i].filter == true) {
                log_message_html += '<li><div class="log_message_element"><span class="log_message_name">' + LogPanel.messages[i].text + '</span></div></li>';
            };
        };
    };
    log_message_html += "</ul>";
    w("log_message", log_message_html);



    w("space_container", Space.getHTML());
    w("rally_container", Rally.getHTML());
    w("castle_container", Castle.getHTML());

    w("dungeon_battlefield_container", Dungeon.getBattlefieldString());

}


function Ship() {
    this.capacity = 100;
    this.speed = 100;

    this.cargo = {
        resources: {'iron': 0, 'oil': 0, 'uranium': 0, 'iridium': 0}
    };

    this.reward = function(resource, quantity, silent) {
        if (quantity < 0) return false;
        if (Player.checkReputation('generosity', silent)) quantity *= 2;
        this.cargo.resources[resource] += quantity;
        if (!silent) message("Gained " + quantity.toFixed(2) + " of " + resource);
    };

    this.withdraw = function(resource, quantity, silent) {
        if (this.cargo.resources[resource] - quantity < 0) {
            return false;
        }
        this.cargo.resources[resource] -= quantity;
        if (!silent) message("Paid " + quantity.toFixed(2) + " of " + resource);
        return true;
    };

    this.getCargoCapacity = function () {
        return this.capacity;
    };

    this.getCargoFullness = function () {
        return sum(this.cargo.resources);
    };

    this.repair = function () {

    };

    this.getSpeed = function () {
        return this.speed;
    };

}



var SpaceHelper = {};
SpaceHelper.generateMarket = function() {
    return {'iron': {price: 100, count: 100}, 'oil': {price: 100, count: 100}, 'uranium': {price: 100, count: 100}, 'iridium': {price: 100, count: 100}};
};


var Space = {};

Space = {
    state: 'system', // warp, planet, system, flight

    current_system: 0,
    current_object: {id: 0, type: 'system'},

    flight: {
        counter: 0,
        length: 0,
        target: {id: null, type: null, obj: null},
        arrival_function: {}
    },

    map: {
        systems: [
            {
                name: 'Solar',

                planets: [
                    {
                        name: 'Venus',
                        action: {
                            name: 'Transform 100 iridium to 1 cultural project',
                            code: function () {
                                if (Player.ship.withdraw('iridium', 100)) {
                                    Player.reward('cultural_project', 1);
                                }
                            }
                        },
                        services: {store: {}, trade: {}}
                    },
                    {
                        name: 'Earth', produce: 'oil',
                        action: {
                            name: 'Transform 1000 conventional units to 1 oil',
                            code: function () {
                                if (Player.withdraw('conventional_units', 1000)) {
                                    Player.ship.reward('oil', 1);
                                }
                            }
                        },
                        services: {store: {}, trade: {}}
                    },
                    {
                        name: 'Mars',
                        action: {
                            name: 'Transform 1000 conventional units to Repair',
                            code: function () {
                                if (Player.withdraw('conventional_units', 1000)) {
                                    Player.ship.repair();
                                }
                            }
                        },
                        services: {store: {}, trade: {}}
                    },
                    {
                        name: 'Titan',
                        action: {
                            name: 'Transform 100 uranium to 1 cultural approval',
                            code: function () {
                                if (Player.ship.withdraw('uranium', 100)) {
                                    Player.reward('cultural_approval', 1);
                                }
                            }
                        },
                        services: {store: {}, trade: {}}
                    }
                ],

                stations: [
                    {
                        name: 'Education University',
                        action: {
                            name: 'Transform 100 likes to 1 uranium',
                            code: function () {
                                if (Player.withdraw('likes', 1000)) {
                                    Player.ship.reward('uranium', 1);
                                }
                            }
                        },
                        services: {store: [], trade: {}}
                    },
                    {
                        name: 'Business Center',
                        action: {
                            name: 'Transform 10 money to 1 iridium',
                            code: function () {
                                if (Player.withdraw('money', 10)) {
                                    Player.ship.reward('iridium,', 1);
                                }
                            }
                        },
                        services: {store: [], trade: {}}
                    }
                ],

                belts: [
                    {name: 'Main-belt', produce: 'iron', rocks: []},
                    {name: 'Greek camp', produce: 'iron', rocks: []},
                    {name: 'Trojan camp', produce: 'iron', rocks: []},
                    {name: 'Centaurs tribe', produce: 'iron', rocks: []}
                ]
            },
            {
                name: 'Orsala',

                planets: [
                    {name: 'Gliese',
                        action: {
                            name: 'Transform 100 oil to 1 cultural reform',
                            code: function () {
                                if (Player.ship.withdraw('oil', 100)) {
                                    Player.reward('cultural_reform', 1);
                                }
                            }
                        },
                        services: {store: {}, trade: {}}},
                    {
                        name: 'Arette',
                        produce: 'iridium',
                        action: {
                            name: 'Transform 1000 conventional units to 1 iridium',
                            code: function () {
                                if (Player.withdraw('conventional_units', 1000)) {
                                    Player.ship.reward('iridium', 1);
                                }
                            }
                        },
                        services: {store: {}, trade: {}}
                    },
                    {name: 'Kepler',
                        action: {
                            name: 'Transform 1000 conventional units to Repair',
                            code: function () {
                                if (Player.withdraw('conventional_units', 1000)) {
                                    Player.ship.repair();
                                }
                            }
                        },
                        services: {store: {}, trade: {}}},
                    {name: 'Ko Pur',
                        action: {
                            name: 'Transform 100 iron to 1 cultural concept',
                            code: function () {
                                if (Player.ship.withdraw('iron', 100)) {
                                    Player.reward('cultural_concept', 1);
                                }
                            }
                        },
                        services: {store: {}, trade: {}}}
                ],

                stations: [
                    {
                        name: 'Science Observational',
                        action: {
                            name: 'Transform 100 design to 1 iron',
                            code: function () {
                                if (Player.withdraw('design', 100)) {
                                    Player.ship.reward('iron', 1);
                                }
                            }
                        },
                        services: {store: [], trade: SpaceHelper.generateMarket()}
                    },
                    {
                        name: 'Pirate Hangout',
                        action: {
                            name: 'Transform 1 ideas to 1 oil',
                            code: function () {
                                if (Player.withdraw('ideas', 1)) {
                                    Player.ship.reward('oil', 1);
                                }
                            }
                        },
                        services: {store: [], trade: {}}
                    }
                ],

                belts: [
                    {name: 'Main-belt', produce: 'uranium', rocks: []},
                    {name: 'Maya camp', produce: 'uranium', rocks: []},
                    {name: 'Aztec camp', produce: 'uranium', rocks: []},
                    {name: 'Leviathan shore', produce: 'uranium', rocks: []}
                ]
            }
        ]
    }
};

Space.tick = function () {
    if (this.state == 'flight') {
        this.flight.counter++;
        if (this.flight.counter == this.flight.length) {
            message("Arrival!");
            this.flight_arrival_function();
        }
    }
};

Space.getHTML = function () {
    var html = `
    <hr>
    <button class="collapsar" data-toggle="collapse" data-target="#space_collapse">-</button>
    <div class="flex-element" id="space_title_container">${Space.getSpaceTitle()}</div>
    <div class="flex-element flex-container-row">`;
    space_resources.forEach(function (resource) {
        var secret_class = (['planet', 'station'].indexOf(Space.state) == -1) ? ' init_secret ' : ' ';
        html += `
                <div class="flex-element">
                ${resource}: ${Player.ship.cargo.resources[resource]}
                <button class="${secret_class}" onclick="Space.buy('${resource}')">buy</button>
                <button class="${secret_class}" onclick="Space.sell('${resource}')">sell</button>
                </div>`;
    });
    html += `</div>
    <div class="flex-element flex-container-row">
        <div class="flex-element">Cargo: ${Player.ship.getCargoFullness()}/${Player.ship.getCargoCapacity()}</div>
        <div class="flex-element">Speed: 100/100</div>
        <div class="flex-element">Armor: 100/100</div>
        <div class="flex-element">Shield: 100/100</div>
    </div>
    <div class="collapse in" id="space_collapse">
        <div id="space_content_container" class="flex-container-column">
            ${Space.getSpaceString()}
        </div>
    </div>`;
    return html;
};



Space.getSpaceTitle = function () {
    var html = `Space. `;



    if (Space.state == 'flight') {
        html += 'You in warp.';
    }
    else {
        if (Space.current_object.type == 'system') {
            html += `You in ${Space.map.systems[Space.current_system].name} system. `;
        }
        else {
            var name = Space.map
            html += `You in ${Space.map.systems[Space.current_system][Space.current_object.type + 's'][Space.current_object.id].name} ${Space.current_object.type}. `;
        }
    }
    html += `You Conventional Units: ${Player.conventional_units}`;
    return html;
};


Space.getSpaceString = function () {
    var states = {
        system: function () {
            var html = `
            <div class="flex-element flex-container-column">
                <div class="flex-element flex-container-column">`;
            Space.map.systems[Space.current_system].planets.forEach(function (planet, id) {
                html += `<div><button onclick="Space.startFly('planet', ${id})">Fly</button> to ${planet.name} planet</div>`;
            });
            Space.map.systems[Space.current_system].belts.forEach(function (belt, id) {
                html += `<div><button onclick="Space.startFly('belt', ${id})">Fly</button> to ${belt.name} belt</div>`;
            });
            Space.map.systems[Space.current_system].stations.forEach(function (station, id) {
                html += `<div><button onclick="Space.startFly('station', ${id})">Fly</button> to ${station.name} station</div>`;
            });
            Space.map.systems.forEach(function (system, id) {
                if (id == Space.current_system) return;
                html += `<div><button onclick="Space.startFly('system', ${id})">Jump</button> to ${system.name} system</div>`;
            });
            html +=`</div></div>`;
            return html;
        },
        flight: function () {
            var html = `
            <div class="flex-element flex-container-column">
                <div class="flex-element flex-container-column">`;
            html +=`<div>Sped: ${Player.ship.getSpeed()}. </div>`;
            html +=`<div>Destination: ${Space.flight.target.obj.name} ${Space.flight.target.type}. </div>`;
            html +=`<div>Progress: ${Space.flight.counter}/${Space.flight.length} </div>`;
            html +=`</div></div>`;
            return html;
        },
        planet: function () {
            var html = `
            <div class="flex-element flex-container-column">
                <div class="flex-element flex-container-column">`;
            html +=`<button onclick="Space.map.systems[${Space.current_system}]['${Space.current_object.type}s'][${Space.current_object.id}].action.code()">${Space.map.systems[Space.current_system][Space.current_object.type + 's'][Space.current_object.id].action.name}</button>`;
            html +=`<button onclick="Space.start()">Start from the planet</button>`;
            html +=`</div></div>`;
            return html;
        },
        belt: function () {
            var html = `
            <div class="flex-element flex-container-column">
                <div class="flex-element flex-container-column">`;
            html +=`<button onclick="Space.start()">Moving away from the belt.</button>`;
            html +=`</div></div>`;
            return html;
        },
        station: function () {
            var html = `
            <div class="flex-element flex-container-column">
                <div class="flex-element flex-container-column">`;
            html +=`<button onclick="Space.map.systems[${Space.current_system}]['${Space.current_object.type}s'][${Space.current_object.id}].action.code()">${Space.map.systems[Space.current_system][Space.current_object.type + 's'][Space.current_object.id].action.name}</button>`;
            html +=`<button onclick="Space.start()">Start from the station</button>`;
            html +=`</div></div>`;
            return html;
        },
    };

    return states[this.state]();
};

Space.startFly = function(type, id) {
    console.log(type, id);
    this.state = 'flight';
    this.flight.target.type = type;
    this.flight.target.id = id;

    if (type == 'system') {
        this.flight.target.obj = Space.map.systems[id];
        this.current_system = id;
    }
    else {
        this.flight.target.obj = Space.map.systems[Space.current_system][type + 's'][id];
    }
    this.flight.counter = 0;
    this.flight.length = 5;
    this.flight_arrival_function = function () {
        Space.state = Space.flight.target.type;
        Space.current_object.id = Space.flight.target.id;
        Space.current_object.type = Space.flight.target.type;
        Space.flight.target = {id: null, type: null, obj: null};
    }


};

Space.start = function() {
    this.startFly('system', this.current_system);
};

Space.buy = function (resource) {
    var count = 0;
    var price = 0;
    if (Player.withdraw('conventional_units', price)) {
        Player.ship.reward('iridium', count);
    }
};

Space.sell = function (resource) {
    var count = 0;
    var price = 0;
    if (Player.ship.withdraw('iridium', count)) {

        Player.withdraw('conventional_units', price)
    }
};








var RallyHelper = {};
RallyHelper.generateTrack = function() {
    var track = [];
    track.push({type: 'line', speed: 150, curve: 0, length: 1000});
    track.push({type: 'dirt', speed: 80, curve: 45, length: 600});
    track.push({type: 'hill', speed: 50, curve: 90, length: 300});
    track.push({type: 'road', speed: 100, curve: 30, length: 800});
    return track;
};


var Rally = {
    skills: {
        attention: new Billet('attention', {race_win_points: 1}, 0, ''),
        coordination: new Billet('coordination', {race_win_points: 1}, 0, ''),
        concentration: new Billet('concentration', {race_win_points: 1}, 0, ''),
        perception: new Billet('perception', {race_win_points: 1}, 0, '')},
    car: {
        wheels: new Billet('wheels', {likes: resources_rates.likes}, 1.5, ''),
        transmission: new Billet('transmission', {design: resources_rates.design}, 1.5, ''),
        engine: new Billet('engine', {money: resources_rates.money}, 1.5, ''),
        electronic: new Billet('electronic', {ideas: resources_rates.ideas}, 1.5, '')},
    strategies: {
        stable: {attention: 10, coordination: -5, concentration: -5, perception: 0},
        dynamic: {attention: -5, coordination: 10, concentration: 0, perception: -5},
        fast: {attention: -5, coordination: 0, concentration: 10, perception: -5},
        safe: {attention: 0, coordination: -5, concentration: -5, perception: 10}},
    current_strategy: 'dynamic',
    in_race: 0,
    track: RallyHelper.generateTrack(),
    current_part: null,
    current_speed: 0

};

Rally.tick = function () {
    if (this.in_race) {
        var max_speed = this.getMaxSpeed();
        if (this.current_speed < max_speed) {
            this.current_speed += (1 / (max_speed / (max_speed - this.current_speed))) * this.getAcceleration();
        }
        else {
            this.current_speed -= (1 / (max_speed / (max_speed - this.current_speed))) * 2 * this.getAcceleration();
        }
    }
};

Rally.getHTML = function () {
    var html = `    
    <hr>
    <button class="collapsar" data-toggle="collapse" data-target="#rally_collapse">-</button>
    Rally. Wins: ${Player.race_win_points_memory}, new wins: ${Player.race_win_points}.
    <div class="collapse in" id="rally_collapse">
        <div id="rally" class="flex-container-column">`;
    html += `
            <div>
                <div class="flex-element flex-container-column">`;

    html += `<div class="flex-element flex-container-row">`;
    for (var skill_id in this.skills) {
        var skill = this.skills[skill_id];
        var upd_button = (Player.race_win_points >= 1) ? `<button onclick="Rally.upgradeSkill('${skill_id}')">Up</button>` : '';
        html += `
                <div class="flex-element">
                Skill ${skill.name}: ${skill.level} ${upd_button}
                </div>`;
    }
    html += `</div>`;

    html += `<div class="flex-element flex-container-row">`;
    for (var part_id in this.car) {
        var part = this.car[part_id];
        var upd_button = `<button onclick="Rally.upgradeCar('${part_id}')">Up: ${JSON.stringify(Rally.getUpgradeCost(part_id))}</button>`;
        html += `
                <div class="flex-element">
                Part ${part.name}: ${part.level} ${upd_button}
                </div>`;
    }
    html += `</div>`;

    if (this.in_race) {
        html += `<h3 class="flex-element text-center">Lap: 0/10</h3>`;
        html += `<div class="flex-element flex-container-row">`;
        for (var strategy_id in this.strategies) {
            var strategy = this.strategies[strategy_id];
            var strategy_lable = (this.current_strategy == strategy_id) ? "Selected" : '<button onclick="Rally.selectStrategy(\'' + strategy_id + '\');">Select</button>';

            html += `
                    <div class="flex-element">
                        ${strategy_lable} ${strategy_id} strategy
                    </div>`;
        }
        html += `</div>`;

        html += `    <div class="flex-element flex-container-row">
                         <h3 class="flex-element text-center">Drift: ${Rally.getDrift().toFixed(2)}%</h3>
                         <h3 class="flex-element text-center">Speed: ${Rally.getSpeed().toFixed(2)}</h3>
                         <h3 class="flex-element text-center">Flip: ${Rally.getFlip().toFixed(2)}%</h3>
                     </div>`;

        html += `</div>`;
    }
    else {
        html += '       <button onclick="Rally.start();">Start Rally</button>';
    }
        html += `   </div>
                </div>
            </div>
        </div>`;
    return html;
};

Rally.start = function () {
    if (Player.action_points < 1) {
        message("Not enough action points.");
        return false;
    }

    Player.action_points--;
    this.in_race = 1;
    this.current_part = this.track[0];
};

Rally.selectStrategy = function (strategy_id) {
    this.current_strategy = strategy_id;
};

Rally.getSpeed = function () {
    return this.current_speed;
};

Rally.getMaxSpeed = function() {
    return 100 + this.car.engine.level + this.skills.concentration.level + this.strategies[this.current_strategy].concentration;
};

Rally.getAcceleration = function() {
    return 10 + this.car.transmission.level + this.skills.coordination.level + this.strategies[this.current_strategy].coordination;
};

Rally.getDrift = function () {
    return this.current_speed * this.current_part.curve * 0.1 * (60 - (this.car.wheels.level + this.skills.attention.level + this.strategies[this.current_strategy].attention));
};

Rally.getFlip = function () {
    return this.current_speed * this.current_part.curve * 0.01 * (60 - (this.car.electronic.level + this.skills.perception.level + this.strategies[this.current_strategy].perception));
};


Rally.upgradeSkill = function(part) {
    this.skills[part].upgrade();
};

Rally.upgradeCar = function(part) {
    this.car[part].upgrade();
};

Rally.getUpgradeCost = function(part) {
    return Rally.car[part].getUpgradeCost();
};



var Castle = {
    in_battle: 0,
    current_wave_counter: 0,
    current_wave: [],
    battleground: [],
    base_hp: 100,
    towers: {
        mentoring: new Billet('mentoring', {likes: resources_rates.likes}, 1.2, "Enlighten the first enemy."),
        training: new Billet('training', {design: resources_rates.design}, 1.2, "Enlightens all not fanatical enemies."),
        revelation: new Billet('revelation', {money: resources_rates.money}, 1.2, "Enlighten the first fanatical enemy."),
        illumination: new Billet('illumination', {ideas: resources_rates.ideas}, 1.2, "Enlighten a random enemy.")
    }
};

Castle.tick = function() {
    if (this.battleground.length > 0) {
        var mass_damage = 0.01 * this.towers.mentoring.level;
        var first_damage = 0.1 * this.towers.training.level;
        var fanatic_damage = 0.1 * this.towers.revelation.level;
        var random_damage = 1 * this.towers.illumination.level;

        for (var id in this.battleground) break;
        this.battleground[id].hp.current -= first_damage;

        for (var id in this.battleground) {
            if (this.battleground[id].type == 'fanatic') {
                this.battleground[id].hp.current -= fanatic_damage;
                break;
            }
        }

        this.battleground[rand(0, this.battleground.length-1)].hp.current -= random_damage;

        this.battleground.forEach(function (unit, id) {
            this.battleground[id].hp.current -= mass_damage;

            if (this.battleground[id].hp.current < 0) {
                this.giveTrophy(this.battleground[id]);
                this.battleground.splice(id, 1);
            }
            else {
                if (this.battleground[id].progress < 100) {
                    this.battleground[id].progress += this.battleground[id].speed;
                    if (this.battleground[id].progress > 100) this.battleground[id].progress = 100;
                }
                else {
                    this.base_hp -= this.battleground[id].attack;
                }
            }

        }, this);
    }

    if (this.current_wave.length > 0) {
        this.battleground.push(this.current_wave.pop());
    }

    if (this.current_wave.length == 0 && this.battleground.length == 0) {
        this.in_battle = 0;
    }

};

Castle.getHTML = function() {
    var html = `    <hr>
        <button class="collapsar" data-toggle="collapse" data-target="#castle_collapse">-</button>
        <div>Education. Base HP: ${this.base_hp} Wave: ${this.current_wave_counter}. <button onclick="Castle.sendNextWave();">Next Wave</button></div>
        <div class="collapse in" id="castle_collapse">
            <div class="flex-container-column" id="castle">
                <div class="flex-container-row" id="castle_towers">`;

    for (var key in this.towers) {
        html += this.towers[key].getHTML(key, '', 'Castle.upgradeTower');
    }

    html +=    `</div>
                <div class="flex-container-column text-center" id="castle_enemies">`;

    if (this.battleground.length) html +=`<h3 class="flex-element">Classes:</h3>
                    <div class="flex-container-row">
                        <div class="flex-element">Name:</div>
                        <div class="flex-element">Type:</div>
                        <div class="flex-element">Progress:</div>
                        <div class="flex-element">Hp:</div>
                        <div class="flex-element">Dmg:</div>
                        <div class="flex-element">Speed:</div>
                    </div>
`;

    for (var key in this.battleground) {
        var enemy = this.battleground[key];
        html +=    `<div class="flex-container-row">
                        <div class="flex-element">${enemy.name}. </div>
                        <div class="flex-element">${enemy.type}. </div>
                        <div class="flex-element">${enemy.progress.toFixed(2)}%. </div>
                        <div class="flex-element">${enemy.hp.current.toFixed(2)}/${enemy.hp.max.toFixed(2)}. </div>
                        <div class="flex-element">${enemy.attack.toFixed(2)}. </div>
                        <div class="flex-element">${enemy.speed.toFixed(2)}. </div>
                    </div>
        `;
    }

    html += `</div></div>
        <div>
            Population: ${Player.td_trophy} 
        </div>

    </div>`;
    return html;
};

Castle.upgradeTower = function(tower) {
    this.towers[tower].upgrade();
};

Castle.sendNextWave = function() {
    this.in_battle = 1;
    this.current_wave_counter++;
    this.current_wave = this.current_wave.concat(this.generateWave());

};

Castle.generateWave = function () {
    var wave = [];

    var enemies = [
        {name: 'blockhead', type: 'normal', hp: {max: 10, current: 10}, attack: 1, speed: 1, progress: 0},
        {name: 'fool', type: 'fast', hp: {max: 5, current: 5}, attack: 1, speed: 2, progress: 0},
        {name: 'ignoramus', type: 'fanatic', hp: {max: 6, current: 6}, attack: 1.5, speed: 1, progress: 0},
        {name: 'breaker', type: 'tanked', hp: {max: 20, current: 20}, attack: 2, speed: 0.5, progress: 0},
        ];

    for (var i = 0; i < this.current_wave_counter; i++) {
        var enemy = enemies[rand(0, enemies.length-1)];

        var rate = 1 + (0.1 * Math.sqrt(this.current_wave_counter-1));

        enemy.hp.max *= rate;
        enemy.hp.current *= rate;
        enemy.attack *= rate;
        enemy.speed *= rate;


        wave.push(enemy);
    }
    return wave;
};

Castle.giveTrophy = function (enemy) {
    message('Trophy!');
    Player.td_trophy++;
};



var Dungeon = {
    map: [],
    in_battle: 0,
    player_position: 0
};


Dungeon.mapGenerator = function () {
    this.map = [];
    this.player_position = 0;
    for (var i = 0; i < 100; i++) {
        if (rand(0, 5) != 0) {
            this.map[i] = {symbol: '_', unit: null};
        }
        else {
            this.map[i] = {symbol: '~', unit: null};
        }
    }
    this.map[0].special = 'enter';
    this.map[99].special = 'exit';
};

Dungeon.getBattlefieldString = function () {
    if (this.in_battle) {
        return this.getMapString();
    }
    else {
        return this.getMenuString();
    }
};

Dungeon.getMapString = function () {
    var map_string = '';
    var visible_area = this.getVisibleArea();

    visible_area.forEach(function (place, id) {
        map_string += Dungeon.getPlaceString(id);
    });

    return map_string;
};

Dungeon.getVisibleArea = function () {
    var shift = (this.player_position > 5) ? this.player_position - 5 : 0;
    var visible_area = [];

    this.map.forEach(function (place, id) {
        if (id >= shift && id < shift + 20) {
            visible_area[id] = place;
        }
    });

    return visible_area; // this.map.slice(shift, shift + 20);
};

Dungeon.getPlaceString = function (id) {
    var place = this.map[id];

    if (place.unit) { return place.unit.symbol; }
    if (place.special == 'enter') { return '0'; }
    if (place.special == 'exit') { return 'O'; }

    return place.symbol;
};

Dungeon.getMenuString = function () {
    return '<button onclick="Dungeon.go();">Go to dungeon</button>';
};

Dungeon.go = function () {
    if (Player.action_points < 1) {
        message("Not enough action points.");
        return false;
    }

    Player.action_points--;
    this.mapGenerator();
    this.map[0].unit = Player.unit;
    this.in_battle = 1;
};

Dungeon.tick = function () {
    if (this.in_battle == 0) {
        return false;
    }
    else {
        var visible_area = this.getVisibleArea();

        var units = [];

        visible_area.forEach(function (place ,id) {
            units[id] = place.unit;
        });

        units.forEach(function (unit, id) {
            if (!unit) return false;
            //console.log(unit);
            unit.AI(id);
        });
    }
};

Dungeon.unitMove = function (from_id, to_id) {
    var unit =  this.map[from_id].unit;
    if (unit == Player.unit) this.player_position = to_id;
    this.map[to_id].unit = unit;
    this.map[from_id].unit = null;
};

Dungeon.exit = function () {
    this.in_battle = 0;
    Player.knowledge++;
};




function Unit () {
    this.team = ''; // ally, enemy
    this.symbol = '';

    this.skills = {
        weapon: 0,
        armor: 0,
        hp: 0,
        mp: 0
    };

    this.weapon = {
        sword: 0,
        shield: 0,
        bow: 0,
        staff: 0
    };

    this.armor = {
        helm: 0,
        chest: 0,
        gloves: 0,
        boots: 0
    };

    this.bottles = {
        hp: 0,
        mp: 0,
        rage: 0,
        firebomb: 0
    };

    this.magic = {
        heal: 0,
        wave: 0,
        rage: 0,
        fireball: 0
    };

    this.hp = {current: 0, max: 0};
    this.mp = {current: 0, max: 0};
    this.stamina = {current: 0, max: 0};
    this.poise = {current: 0, max: 0};

    this.effects = {
        heal: {tick: 0, power: 0},
        rage: {tick: 0, power: 0}
    };

    this.getDamage = function (range) {
        if (range == 1) {
            return Math.max(this.getDamageFromSword(), this.getDamageFromStaffMelee());
        } else if (range <= 5) {
            return Math.max(this.getDamageFromBow(), this.getDamageFromStaffRange());
        } else if (range <= 10) {
            return this.getDamageFromBow();
        }
        else {
            return 0;
        }
    };

    this.getDamageFromSword = function () {
        return 20;
    };

    this.getDamageFromBow = function () {
        return 10;
    };

    this.getDamageFromStaffRange = function () {
        return 15;
    };

    this.getDamageFromStaffMelee = function () {
        return 5;
    };


    this.getDefFloat = function () {
        return 0;
    };

    this.getDefPercent = function () {
        return 0;
    };

    this.getDefChanceBoots = function () {
        return 0;
    };

    this.getDefChanceShield = function () {
        return 0;
    };

    this.AI = function (id) {
        if (this.team == 'ally') {
            if (Dungeon.map[id].special == 'exit') {
                message('exit');
                if (this == Player.unit) Dungeon.exit();
            }
            else if (Dungeon.map[id + 1].unit) {
                message('fight');
            }
            else {
                message('clear');
                Dungeon.unitMove(id, id + 1);
            }
        }
        else {
            //return false;
        }
    };

}



var Gatherer = {
    collection: {},
    events: {
        knowledge_sharing: 0,

        learn: {selfStudy: 0, books: 0, work: 0, petProject: 0},
        increase: 0,
        increase_skill: 0,
        increase_resource: 0,
        decrease: 0,
        ticks: 0,
        found: 0,
        search: 0
    }
};

Gatherer.collect = function (resource, quantity) {
    if (this.collection[resource]) {
    this.collection[resource] += quantity;
    }
    else {
        this.collection[resource] = quantity;
    }
};

Gatherer.increaseSkill = function (skill, value) {
    if (Player[skill] - value < 15 && Player[skill] >= 15 ) { badges.achieve(skill + " 1"); }
    if (Player[skill] - value < 30 && Player[skill] >= 30 ) {
        badges.achieve(skill + " 2");
        Player.addSupervision(skills_departments[skill]);
    }
    if (Player[skill] - value < 45 && Player[skill] >= 45 ) { badges.achieve(skill + " 3"); }
    if (Player[skill] - value < 60 && Player[skill] >= 60 ) { badges.achieve(skill + " 4"); }

    if (this.events.increase_skill < 15 && this.events.increase_skill + 1 >= 15 ) { badges.achieve("learn 1"); }
    if (this.events.increase_skill < 30 && this.events.increase_skill + 1 >= 30 ) { badges.achieve("learn 2"); }
    if (this.events.increase_skill < 45 && this.events.increase_skill + 1 >= 45 ) { badges.achieve("learn 3"); }
    if (this.events.increase_skill < 60 && this.events.increase_skill + 1 >= 60 ) { badges.achieve("learn 4"); }

    this.events.increase_skill++;
};

Gatherer.increaseResource = function (resource, value) {
    var rate = 0;
    if (resource == 'culture') {
        rate = culture_rate * 10;
        if (Player[resource] - value < (rate / 10) && Player[resource] >= (rate / 10)  ) { Player.revealSecret('culture'); }
        if (Player[resource] - value < (rate * 1) && Player[resource] >= (rate * 1)  ) { badges.achieve(resource + " 1");  }
        if (Player[resource] - value < (rate * 10) && Player[resource] >= (rate * 10)  ) { badges.achieve(resource + " 2"); }
        if (Player[resource] - value < (rate * 100) && Player[resource] >= (rate * 100)  ) { badges.achieve(resource + " 3"); }
        if (Player[resource] - value < (rate * 1000) && Player[resource] >= (rate * 1000)  ) { badges.achieve(resource + " 4"); }
    }
    else {
        /*
        rate = resources_rates[resource];
        if (Player[resource] - value < (rate * 1) && Player[resource] >= (rate * 1)  ) { badges.achieve(resource + " 1"); }
        if (Player[resource] - value < (rate * 10) && Player[resource] >= (rate * 10)  ) { badges.achieve(resource + " 2"); }
        if (Player[resource] - value < (rate * 100) && Player[resource] >= (rate * 100)  ) { badges.achieve(resource + " 3"); }
        if (Player[resource] - value < (rate * 1000) && Player[resource] >= (rate * 1000)  ) { badges.achieve(resource + " 4"); }
        */
    }
/*
    if (this.events.increase_resource < 100 && this.events.increase_resource + 1 >= 100 ) { badges.achieve("resources 1"); }
    if (this.events.increase_resource < 1000 && this.events.increase_resource + 1 >= 1000 ) { badges.achieve("resources 2");  Player.revealSecret('objectives'); }
    if (this.events.increase_resource < 10000 && this.events.increase_resource + 1 >= 10000 ) { badges.achieve("resources 3"); Player.revealSecret('sharing'); }
    if (this.events.increase_resource < 100000 && this.events.increase_resource + 1 >= 100000 ) { badges.achieve("resources 4"); }
*/
    this.events.increase_resource++;
};


Gatherer.decrease = function (skill, value) {
    /*
    if (Player[skill] < 15 && Player[skill] + value >= 15 ) { badges.achieve(skill + " 1"); }
    if (Player[skill] < 30 && Player[skill] + value >= 30 ) { badges.achieve(skill + " 2"); }
    if (Player[skill] < 45 && Player[skill] + value >= 45 ) { badges.achieve(skill + " 3"); }
    if (Player[skill] < 60 && Player[skill] + value >= 60 ) { badges.achieve(skill + " 4"); }
    */
    this.events.decrease++;
};

Gatherer.learn = function (method) {
    if (this.events.learn[method] < 15 && this.events.learn[method] + 1 >= 15) { badges.achieve(method + " 1"); }
    if (this.events.learn[method] < 30 && this.events.learn[method] + 1 >= 30) { badges.achieve(method + " 2"); }
    if (this.events.learn[method] < 45 && this.events.learn[method] + 1 >= 45) { badges.achieve(method + " 3"); }
    if (this.events.learn[method] < 60 && this.events.learn[method] + 1 >= 60) { badges.achieve(method + " 4"); }
    this.events.learn[method]++;
};

Gatherer.search = function () { // ?
    if (this.events.search < 15 && this.events.search + 1 >= 15) { badges.achieve(method + " 1"); }
    if (this.events.search < 30 && this.events.search + 1 >= 30) { badges.achieve(method + " 2"); }
    if (this.events.search < 45 && this.events.search + 1 >= 45) { badges.achieve(method + " 3"); }
    if (this.events.search < 60 && this.events.search + 1 >= 60) { badges.achieve(method + " 4"); }
    this.events.search++;
};

Gatherer.found = function (inflow) {
    if (Player.volunteers_memory < 15 && Player.volunteers_memory + inflow >= 15) { badges.achieve("volunteers 1"); Player.revealSecret('education'); Player.revealSecret('teamwork'); }
    if (Player.volunteers_memory < 30 && Player.volunteers_memory + inflow >= 30) { badges.achieve("volunteers 2"); Player.revealSecret('departments'); }
    if (Player.volunteers_memory < 45 && Player.volunteers_memory + inflow >= 45) { badges.achieve("volunteers 3"); Player.revealSecret('motivation'); }
    if (Player.volunteers_memory < 60 && Player.volunteers_memory + inflow >= 60) { badges.achieve("volunteers 4"); Player.revealSecret('activism'); }

};

Gatherer.tick = function () {
    /*
    if (this.events.ticks < 7 && this.events.ticks + 1 >= 7 ) {  }
    if (this.events.ticks < 30 && this.events.ticks + 1 >= 30 ) { badges.achieve("tick 1");    }
    if (this.events.ticks < 356 && this.events.ticks + 1 >= 356 ) { badges.achieve("tick 2"); Player.revealSecret('upgrade_department'); Player.revealSecret('cancel_event'); }
    if (this.events.ticks < 356*10 && this.events.ticks + 1 >= 356*10 ) { badges.achieve("tick 3"); Player.revealSecret('invent'); }
    if (this.events.ticks < 356*100 && this.events.ticks + 1 >= 356*100 ) { badges.achieve("tick 4"); }
    */
    this.events.ticks++;
};


var buildings = {};
buildings.db = [];

function Building(name, types, price_ratio, price_resource, multiplying_formula, base_rate, text) {
    this.name = name;
    this.types = types; // [] of: simple, upgradable, maintainable
    this.price_ratio = price_ratio;
    this.price_resource = price_resource;
    this.multiplying_formula = multiplying_formula; // function() { return (1 + (Player[this.multiplying_skill] / 60); }
    this.base_rate = base_rate;
    this.text = text;

    this.workers = 0;
    this.level = 0;

    this.increase = function() {
        if (Player.volunteers < 1) {
            message('Not enough free volunteers');
        } else if (this.workers + 1 > Civilization.updates.teamwork.level) {
            message('Not enough teamwork');
        } else {
            Player.volunteers--;
            this.workers++;
            draw_all();
        }
    };

    this.decrease = function() {
        if (this.workers >= 1) {
            Player.volunteers++;
            this.workers--;
            draw_all();
            //    message('One volunteer from the Department of ' + this.name + ' was released.');
        }
        else {
            message('Not enough volunteers in department');
        }
    };

    this.upgrade = function() {
        if (Player.withdrawArray(this.getUpgradeCost())) {
            this.level++;
            draw_all();
        }
    };

    this.getUpgradeCost = function() {
        var cost = {};
     //   console.log(this.price_resource, this.base_rate, this.level, this.price_ratio)
        cost[this.price_resource] = this.base_rate * (1 + Math.pow(this.level, this.price_ratio));
        return cost;
    };

    this.getEfficiency = function() {
        return Civilization.getHappiness() * this.workers * (1 + (0.1 * this.level)) * this.multiplying_formula();
    };

    this.getProductivity = function() {
        var adjustment = 10 / 60 / 60;
        //   console.log(this.name, rate, adjustment);
        return this.getEfficiency() * this.base_rate * adjustment;
    };

    return this;
}


var Civilization = {
    happiness: 0,

    updates: {
        communication: new Billet('communication', {culture: culture_rate}, 1.6, "Raises culture soft-cap."),
        attentiveness: new Billet('attentiveness', {culture: culture_rate}, 1.7, "Soften culture soft-cap."),
        teamwork: new Billet('teamwork', {culture: culture_rate}, 1.8, "Expands the maximum size of the teams."),
        sharing: new Billet('sharing', {culture: culture_rate * 10}, 1.9, "Expands maximum storage size."),
    },
    works: {
        popularization: new Workplace('popularization', {culture: culture_rate}, 1.4, "Slowly increase volunteers, consuming culture.",
            function () { return (Time.season == 'winter') ? 2 : 1; }),
        education: new Workplace('education', {culture: culture_rate}, 1.5, "Slowly increase knowledge, consuming enthusiasm.",
            function () { return (Time.season == 'autumn') ? 2 : 1; }),
        motivation: new Workplace('motivation', {culture: culture_rate}, 1.6, "Increases happiness, consuming culture.",
            function () { return (Time.season == 'spring') ? 2 : 1; }),
        activism: new Workplace('activism', {culture: culture_rate}, 1.7, "Decreases happiness, slowly increase enthusiasm and action points.",
            function () { return (Time.season == 'summer') ? 2 : 1; }),
    }
};

Civilization.tick = function() {
  //  console.log(Player, Civilization);
    Player.culture_rate = 0;

    this.happiness = 0;

    Player.culture_soft_cap = (Civilization.updates.communication.level) * 10;
    if (!Player.culture_soft_cap) Player.culture_soft_cap = 10;
    if (Player.culture_soft_cap < 10) Player.culture_soft_cap = 10;

    var soft_cap = Math.sqrt(Player.culture - Player.culture_soft_cap);
    Player.culture_rate = Civilization.getHappiness() * Player.volunteers * 0.1 / (soft_cap ? (soft_cap / ((( Civilization.updates.attentiveness.level - 1) * 0.1) + 1)) : 1);
   // console.log(Player.culture_rate, Civilization.happiness, Player.volunteers, soft_cap);
    if (Player.culture_rate > 0) Player.reward('culture', Player.culture_rate, 1);

    if (Civilization.works.motivation.workers > 0 &&
        Player.withdraw('culture', Civilization.works.motivation.workers * 0.01, 1)) {
        Player.culture_rate -= Civilization.works.motivation.workers * 0.01;
        this.happiness += Civilization.works.motivation.getEfficiency() / Civilization.getHappiness();
    }

    if (Civilization.works.activism.workers > 0) {
        Player.culture_rate -= Civilization.works.activism.workers * 0.01;
        this.happiness -= Civilization.works.activism.getEfficiency() / Civilization.getHappiness();
        var debuff = Player.volunteers_memory * 1000 + Player.action_points * 1000 + (Player.likes + Player.design * 10 + Player.money * 100 + Player.ideas * 1000);
        Player.enthusiasm += Civilization.works.activism.getEfficiency() / Civilization.getHappiness() * 1 *Math.max(0, (-1 * Math.pow((Player.enthusiasm-100)/100, 3)));
        Player.action_points += Civilization.works.activism.getEfficiency() / Civilization.getHappiness() * 50 / (1 + debuff);
    }

    // enthusiasm boost happiness
    this.happiness += Player.enthusiasm;


    if (Civilization.works.popularization.workers > 0 &&
        Player.withdraw('culture', Civilization.works.popularization.workers * 0.01, 1)) {
        Player.culture_rate -= Civilization.works.popularization.workers * 0.01;
        var new_volunteers = Civilization.works.popularization.getEfficiency() * 0.5 * 0.01 * Math.max(100, 200 - Player.volunteers_memory) / Math.pow(Player.volunteers_memory, 2);
        Gatherer.found(new_volunteers);
        Player.volunteers += new_volunteers;
        Player.volunteers_memory += new_volunteers;
    }

    if (Civilization.works.education.workers > 0 &&
        Player.withdraw('enthusiasm', Civilization.works.education.workers * 0.01, 1)) {
        //Player.culture_rate -= Civilization.works.education.workers * 0.01;
        Player.revealSecret('knowledge');
        Player.knowledge += Civilization.works.education.getEfficiency() * 5 * 0.01 / (2 * (1 + Player.writing + Player.drawing + Player.programming + Player.management + 5*Player.knowledge + 0.5*Player.volunteers_memory));
    }

};

Civilization.getHappiness = function() {
    return (1+(Civilization.happiness / 100));
};

Civilization.getHTML = function() {
    var html = `    <hr>
        <button class="collapsar" data-toggle="collapse" data-target="#culture_collapse">-</button>
        <div>Community. <span title="many factors can change happiness">Happiness bonus: <span id="global_bonus_indicator">${Civilization.happiness.toFixed(2)}</span>%</span></div>
        <div>Culture: <span id="culture_indicator">${Player.culture.toFixed(2)}</span>/<span id="culture_limit_indicator">${Player.culture_soft_cap.toFixed(2)}</span> (<span id="culture_rate_indicator">${Player.culture_rate.toFixed(2)}</span>/sec)</div>
        <div class="collapse in" id="culture_collapse">
            <div class="flex-container-column" id="culture">
                <div class="flex-container-row" id="culture_updates">`;

    for (var key in Civilization.updates) {
        var update = Civilization.updates[key];
        var secret_class = (Player.found_secrets.indexOf(update.name) == -1) ? " init_hidden " : "";
        html += update.getHTML(key, secret_class, 'Civilization.upgradeUpdate');
        /*
        var upgrade_cost = update.getUpgradeCost();
        for (var resource_name in upgrade_cost) break;
        var price = upgrade_cost[resource_name];


        html += `    <div class="flex-element flex-container-column ${secret_class}" id="${key}_container">
                        <div class="flex-element flex-container-row ">
                            ${key.capitalizeFirstLetter()}
                            <div class="${secret_class}">: <span id="${key}level">${update.level}</span></div>
                        </div>
                        <div class="flex-element"><button onclick="Civilization.upgradeUpdate('${key}');">Up: ${price.toFixed(2)} ${resource_name}</button></div>
                        <div class="flex-element">${update.text}</div>
                    </div>`;*/
    }

    html += `</div><br><div class="flex-container-row " id="culture_works">`;

    for (var key in Civilization.works) {
        var work = Civilization.works[key];
        var secret_class = (Player.found_secrets.indexOf(work.name) == -1) ? " init_hidden " : "";
        html += work.getHTML(key, secret_class, 'Civilization.upgradeWork');

        /*
        html += `    <div class="flex-element flex-container-column ${secret_class}" id="${key}_container">
                        <div class="flex-element flex-container-row ">
                            ${key.capitalizeFirstLetter()}
                            <div class="${secret_class}">: <span id="${key}level">${work.level}</span></div>
                        </div>`;

        var upgrade_cost = work.getUpgradeCost();
        for (var resource_name in upgrade_cost) break;
        var price = upgrade_cost[resource_name];

        html += `<div class="flex-element"><button onclick="Civilization.upgradeWork('${key}');">Up: ${price.toFixed(2)} ${resource_name}</button></div>`;
        html += `<div class="flex-element">
            <span id="${key}_volunteers">Workers: ${work.workers}/${Civilization.updates.teamwork.level}</span>
            <button class = "" onclick="Civilization.increase('${key}');"> + </button>
            <button class = "" onclick="Civilization.decrease('${key}');"> - </button>
            </div>`;
        html += `<div class="flex-element">${work.text}</div></div>`; */
    }

    html += `</div></div></div>`;

    return html;
};

Civilization.upgradeUpdate = function(update) {
    this.updates[update].upgrade();
};

Civilization.getUpgradeCostUpdate = function(update) {
    return this.updates[update].getUpgradeCost();
};

Civilization.increase = function(work) {
    this.works[work].increase();
};

Civilization.decrease = function(work) {
    this.works[work].decrease();
};

Civilization.upgradeWork = function(work) {
    this.works[work].upgrade();
};

Civilization.getUpgradeCostWork = function(work) {
    return this.works[work].getUpgradeCost();
};




function Department(name) {
    this.name = name;
    this.workers = 0;
    this.level = 0;

    this.multiplying_skill = {'smm': 'writing', 'design': 'drawing', 'site': 'programming', 'docs': 'management'}[this.name];
    this.base_resource = {'smm': 'likes', 'design': 'design', 'site': 'money', 'docs': 'ideas'}[this.name];
    this.base_rate = resources_rates[this.base_resource];

    this.countOfWork = 0;
    this.supervision = 0;
    this.isSupervision = 0;

    this.setSupervision = function (skilllvl) {
        this.supervision = this.isSupervision * (1 + skilllvl / 30 + this.countOfWork * 1.5);
    };

    this.increase = function() {
        if (Player.volunteers < 1) {
            message('Not enough free volunteers');
        } else if (this.workers + 1 > Civilization.updates.teamwork.level) {
            message('Not enough teamwork');
        } else {
            Player.volunteers--;
            this.workers++;
            draw_all();
        }
    };

    this.decrease = function() {
        if (this.workers >= 1) {
            Player.volunteers++;
            this.workers--;
            draw_all();
        //    message('One volunteer from the Department of ' + this.name + ' was released.');
        }
        else {
            message('Not enough volunteers in department');
        }
    };

    this.upgrade = function() {
        if (Player.withdrawArray(this.getUpgradeCost())) {
            this.level++;
            draw_all();
        }
    };

    this.getUpgradeCost = function() {
        var cost = {};
      //  cost[this.base_resource] = Math.pow(this.base_rate + (this.level * 0.1 * this.base_rate) , ((this.level*0.1) + 1));
        cost[this.base_resource] = this.base_rate * (1 + Math.pow(this.level, 1.5));
        return cost;
    };

    this.getEfficiency = function() {
        return Civilization.getHappiness() * (this.workers + this.supervision) * (1 + (0.1 * this.level)) * (1 + (Player[this.multiplying_skill] / 60));
    };

    this.getProductivity = function() {
       
     //   console.log(this.name, rate, adjustment);
        return this.getEfficiency() * this.base_rate * adjustment;
    };


    return this;
}

Department.getHTML = function() {
    var html = `<hr><button class="collapsar" data-toggle="collapse" data-target="#departments_collapse">-</button>
    Departments: 
    <div class="collapse in" id="departments_collapse">
    <div class="flex-container-row" id="departments">`;
    
    for (var key in Player.departments) {
        var department = Player.departments[key];
        var upgrade_cost = department.getUpgradeCost();
        for (var resource_name in upgrade_cost) break;
        var price = upgrade_cost[resource_name];
        var secret_class = (Player.found_secrets.indexOf("upgrade_department") == -1) ? "init_secret" : "";

        html += `
        <div class = "flex-element flex-container-column" id = "${key}">
            <div class="flex-element">${key.capitalizeFirstLetter()}</div>
            <div class = "${secret_class} flex-element">
                Level: <span id="${key}level"> ${department.level}</span>
                <button onclick = "Player.upgradeDepartment('${key}');">
                    Up: ${price.toFixed(2)} ${resource_name} 
                </button>
            </div>
                
            <div>Workers: <span id="${key}_volunteers">  
                ${department.workers} / ${(Civilization.updates.teamwork.level)} </span>
                <button class = "" onclick="Player.increaseDepartment('${key}');">+</button>
                <button class = "" onclick="Player.decreaseDepartment('${key}');">-</button>
            </div>

            <div class="flex-element">
                Efficiency: <span id="${key}_productivity"> 
                ${Player.getDepartmentEfficiency(key).toFixed(2)}</span>
            </div>
            <div class="flex-element">
                Productivity: <span id="${key}_productivity"> 
                ${Player.getDepartmentProductivity(key).toFixed(2)} ${department.base_resource} </span>
            </div>
        </div>`;
    }

    html += `</div></div>`;
    return html;
};


var Player = {
    enthusiasm: 0,

    volunteers: 0,
    volunteers_memory: 0,

    // C1 resources
    culture: 0,
    culture_soft_cap: 0,
    culture_rate: 0,

    // C2 resources
    cultural_approval: 0,
    cultural_concept: 0,
    cultural_project: 0,
    cultural_reform: 0,

    knowledge: 0,
    max_knowledge: 0, // ?)

    action_points: 0,

    // R1 resources
    likes: 0,
    design: 0,
    money: 0,
    ideas: 0,

    departments: {'smm': new Department('smm'), 'design': new Department('design'), 'site': new Department('site'), 'docs': new Department('docs')},

    // skills
    writing: 0,
    drawing: 0,
    programming: 0,
    management: 0,

    // Reputation
    kindness: 1,
    generosity: 1,
    thoughtfulness: 1,
    innovativeness: 1,

    found_secrets: [],

    unit: new Unit(),

    ship: new Ship(),
    conventional_units: 100000,

    race_win_points: 0,
    race_win_points_memory: 0,

    td_trophy: 0
};

Player.unit.team = 'ally';
Player.unit.symbol = 'P';


Player.tick = function () {
    this.enthusiasm += Math.max(0, (-1 * Math.pow((this.enthusiasm-100)/100, 3)));
    this.harvest();
};

Player.addSupervision = function (department_name) {
    this.departments[department_name].isSupervision = 1;
    this.departments[department_name].setSupervision(this[this.departments[department_name].multiplying_skill]);
};

Player.seek = function() {
    if (!this.checkEnthusiasm()) return false;
    this.enthusiasm--;

    var inflow = 1 / (0.05 * 0.01 * Math.pow(this.volunteers_memory, 4) + 1);

    if (this.volunteers_memory > 3) {
        Player.revealSecret('culture');
    }
    else {
        message('Reward: You found one more volunteers.');
    }
    Gatherer.found(inflow);

    this.volunteers += inflow;
    this.volunteers_memory += inflow;
    draw_all();
};

Player.checkEnthusiasm = function () {
    if (this.enthusiasm <= 1) {
        message("Not enough enthusiasm.");
        return false;
    }
    return true;
};

Player.reset = function () {
    this.volunteers = 0;
    this.volunteers_memory = 0;
    savedLectures = {};
    localStorage.removeItem('Player');
    localStorage.removeItem('lectures.db');
    location.reload();
};

Player.shareKnowledge = function() {
    if (this.knowledge >= 1) {
        Gatherer.found(1);
        this.knowledge--;
        this.volunteers++;
        this.volunteers_memory++;
        Gatherer.events.knowledge_sharing++;
        message("Reward: You share knowledge and found a volunteer.");
    }
    else {
        message("Not enough knowledge.");
    }
};

Player.increaseDepartment = function(department) {
    this.departments[department].increase();
};

Player.decreaseDepartment = function(department) {
    this.departments[department].decrease();
};

Player.upgradeDepartment = function(department) {
    this.departments[department].upgrade();
};

Player.getUpgradeCostDepartment = function(department) {
    return this.departments[department].getUpgradeCost();
};

Player.getDepartmentEfficiency = function(department) {
    return this.departments[department].getEfficiency();
};

Player.getDepartmentProductivity = function(department) {
    return this.departments[department].getProductivity();
};

Player.harvest = function () {
    for (var key in Player.departments) {
        var department = Player.departments[key];
        var resources = {'smm': 'likes', 'design': 'design', 'site': 'money', 'docs': 'ideas'}[key];
        if (this.getDepartmentProductivity(key)) {
            Player.reward(resources, this.getDepartmentProductivity(key), 1);
        }
    }
};

Player.revealSecret = function(secret) {
    if (this.found_secrets.indexOf(secret) == -1) {
        this.found_secrets.push(secret);
        var secret_container = document.getElementById(secret + '_container');
        if (secret_container && secret_container.style.display != 'block') {
            secret_container.style.display = 'block';
        }
        //document.getElementById(secret + '_container').style.display = 'block';
    }
};

Player.checkReputation = function(reputation, silent) {
    if (random(0, 100) < this[reputation]) {
        if (!silent) message({
            "kindness": "Affected your kindness, you refuse to take payment. You knowledge have to take these resources for free.",
            "generosity": "The fame of your generosity reaches many. You give twice as much resources.",
            "thoughtfulness": "Thoughtfulness led to enlightenment. Knowledge came looking for you.",
            "innovativeness": "Thanks to your innovative thinking, you can make twice as much experience."
        }[reputation]);
        return true;
    }
    return false;
};

Player.learn = function(skill, quantity) {
    if (quantity > 0) this.revealSecret('actions');

    if (this.checkReputation('innovativeness')) quantity *= 2;

    var new_quantity = Math.min(quantity, 60 - this[skill]);
    this[skill] += new_quantity;
    this.action_points += quantity;
    message("Learned " + new_quantity.toFixed(2) + " of " + skill + ". Added " + quantity.toFixed(2) + " action points.");
    Gatherer.increaseSkill(skill, new_quantity);
    draw_all();
};

Player.reward = function(resource, quantity, silent) {
    if (quantity <= 0) return false;
    if (this.checkReputation('generosity', silent)) quantity *= 2;

    if (resources.indexOf(resource) != -1) {
        Player.revealSecret('resources'); 
        //Player.revealSecret('events');
        var limited_quantity = Math.min(quantity, this.getLimit(resource) - this[resource]);
        if(this[resource] < this.getLimit(resource)) {
            this[resource] += Math.min(quantity, this.getLimit(resource) - this[resource]);
        }
    }
    else {
        this[resource] += quantity;
    }

    Gatherer.collect(resource, limited_quantity);

    if (!silent) message("Gained " + quantity.toFixed(2) + " of " + resource);
};

Player.rewardArray = function (array, silent) {
    for (var key in array) {
        this.reward(key, array[key], silent);
    }
};

Player.getLimit = function (resource) {
    if (resources.indexOf(resource) == -1) return Infinity;

    var storage_t1 = (Storages.buildings.tier1[resource].level - 1) * resources_rates[resource];
    var storage_t2 = (Storages.buildings.tier2[resource].level - 1) * 2 * resources_rates[resource];
    var storage_t3 = (Storages.buildings.tier3[resource].level - 1) * 3 * resources_rates[resource];
    var storage_t4 = (Storages.buildings.tier4[resource].level - 1) * 4 * resources_rates[resource];

    return (resources_base_limits[resource] + storage_t1 + storage_t2 + storage_t3 + storage_t4) * (1 + ((Civilization.updates.sharing.level - 1) * 0.01));
};

Player.withdraw = function(resource, quantity, silent) {
    if (this[resource] - quantity < 0) {
        return false;
    }
    this[resource] -= quantity;
    if (!silent) message("Paid " + quantity.toFixed(2) + " of " + resource);
    Gatherer.decrease(resource, quantity);
//    draw_all();
    return true;
};

Player.withdrawArray = function(array, silent) {
  //  console.log(array);

    var cost_checked = 1;
    for (var key in array) {
        if (!(Player[key] >= array[key])) {
            cost_checked = 0;
            message("Not enough " + key + ".");
        }
    }

    if (cost_checked) {
        for (var key in array) {
            Player.withdraw(key, array[key], silent);
        }
//        draw_all();
        return true;
    }
    return false;
};

Player.paid = function(resource, quantity) {
    this[resource] -= quantity;
    message("Paid " + quantity.toFixed(2) + " of " + resource);
    Gatherer.decrease(resource, quantity);
//    draw_all();
};

Player.countSelfStudyQuantity = function(skill){
    return 2 - (2*(this[skill] / 60));
};

Player.countBooksQuantity = function(){
    return 2 - (2*(Gatherer.events.learn.books / 60));
};

Player.countWorkQuantity = function(skill){
    return Math.max(0, 2*Math.sin(this[skill]/(Math.PI*6)));
};

Player.countPetProjectQuantity = function(skill){
    return (this[skill]*this[skill]/60/60)*2;
};

Player.countQuantity=function(skill,btnName){
    switch(btnName){
        case "Self-study":
            return Player.countSelfStudyQuantity(skill);
            break;
        case "Books":
            return Player.countBooksQuantity();
            break;
        case "Work":
            return Player.countWorkQuantity(skill);
            break;
        case "Pet-project":
            return Player.countPetProjectQuantity(skill);
            break;
    }
};

Player.selfStudy = function(skill) {
    if (this.knowledge < 1) {
        message("You are weak-knowledged for study.");
        return false;
    }

    if (!this.checkReputation('thoughtfulness')) this.knowledge--;

    message("You studied " + skill + " yourself.");
    this.learn(skill, Player.countSelfStudyQuantity(skill));
    Gatherer.learn("selfStudy");

    this.departments[skills_departments[skill]].setSupervision(this[skill]);
};

Player.books = function(skill) {
    if (this.knowledge < 1) {
        message("You are weak-knowledged for reading.");
        return false;
    }
    if (!this.checkReputation('thoughtfulness')) this.knowledge--;
    message("You read book about " + skill + ".");
    this.learn(skill, Player.countBooksQuantity());
    Gatherer.learn("books");

    this.departments[skills_departments[skill]].setSupervision(this[skill]);
};

Player.work = function(skill) {
    if (this.knowledge < 1) {
        message("You are weak-knowledged for the job.");
        return false;
    }
    if (!this.checkReputation('thoughtfulness')) this.knowledge--;

    switch(skill) {
        case "writing":
            message("You worked as a copywriter.");
            this.reward("likes", resources_rates["likes"] * Math.max(this[skill], 0));
            break;
        case "drawing":
            message("You worked as a designer.");
            this.reward("design", resources_rates["design"] * Math.max((this[skill]*2)-30, 0));
            break;
        case "programming":
            message("You worked as a coder.");
            this.reward("money", resources_rates["money"] * Math.max((this[skill]*4)-120, 0));
            break;
        case "management":
            message("You worked as a PM.");
            this.reward("ideas", resources_rates["ideas"] * Math.max((this[skill]*10)-450, 0));
            break;
    }

    message("You learned some " + skill + " on the job.");
    this.learn(skill, Player.countWorkQuantity(skill));
    Gatherer.learn("work");

    this.departments[skills_departments[skill]].countOfWork ++;
    this.departments[skills_departments[skill]].setSupervision( this[skill]);
};

Player.petProject = function(skill) {
    if (this.knowledge < 1) {
        message("You are weak-knowledged for working.");
        return false;
    }
    if (!this.checkReputation('thoughtfulness')) this.knowledge--;

    message("You studied " + skill + " working on your pet-project.");

    this.learn(skill, Player.countPetProjectQuantity(skill));
    Gatherer.learn("petProject");

    // ADD (1/10)% chance to achieve your startup company
    
        startups.found(skill);
        message("You have successfully founded a startup!");
    

    this.departments[skills_departments[skill]].setSupervision(this[skill]);
};


var Storages = {
	buildings: { 
		tier1: {
			likes: new Billet('storage for likes', {likes: resources_rates.likes}, 1.2, "Expands the maximum size of the likes."),
			design: new Billet('storage for design', {design: resources_rates.design}, 1.2, "Expands the maximum size of the design."),
			money: new Billet('storage for money', {money: resources_rates.money}, 1.2, "Expands the maximum size of the money."),
			ideas: new Billet('storage for ideas', {ideas: resources_rates.ideas}, 1.2, "Expands the maximum size of the ideas.")
		}, 
		tier2: {
			likes: new Billet('storage for likes', {likes: resources_rates.likes}, 1.3, "Expands the maximum size of the likes."),
			design: new Billet('storage for design', {design: resources_rates.design}, 1.3, "Expands the maximum size of the design."),
			money: new Billet('storage for money', {money: resources_rates.money}, 1.3, "Expands the maximum size of the money."),
			ideas: new Billet('storage for ideas', {ideas: resources_rates.ideas}, 1.3, "Expands the maximum size of the ideas.")
		}, 
		tier3: {
			likes: new Billet('storage for likes', {likes: resources_rates.likes}, 1.4, "Expands the maximum size of the likes."),
			design: new Billet('storage for design', {design: resources_rates.design}, 1.4, "Expands the maximum size of the design."),
			money: new Billet('storage for money', {money: resources_rates.money}, 1.4, "Expands the maximum size of the money."),
			ideas: new Billet('storage for ideas', {ideas: resources_rates.ideas}, 1.4, "Expands the maximum size of the ideas.")
		}, 
		tier4: {
			likes: new Billet('storage for likes', {likes: resources_rates.likes}, 1.5, "Expands the maximum size of the likes."),
			design: new Billet('storage for design', {design: resources_rates.design}, 1.5, "Expands the maximum size of the design."),
			money: new Billet('storage for money', {money: resources_rates.money}, 1.5, "Expands the maximum size of the money."),
			ideas: new Billet('storage for ideas', {ideas: resources_rates.ideas}, 1.5, "Expands the maximum size of the ideas.")
		} 
	}	
};

Storages.getHTML = function () {
    var html = `<hr><button class="collapsar" data-toggle="collapse" data-target="#resources_collapse">-</button>
    Resources:
    <div id="resources">`;

	var resources_html = "";
    var storages_html = "";


    resources.forEach(function(resource) {
		storages_html += `<div class="flex-container-column">`;

        resources_html += `
       	<div class="flex-element resource_element"> 
        	${resource.capitalizeFirstLetter()}: 
            ${Player[resource].toFixed(2)} <span class="flex-element" id="${resource}_indicator"><span class = "resource_limit">/ 
            ${Player.getLimit(resource).toFixed(2)} </span></span>`;

        var sb = Storages.buildings;  

        var secret_class = (Player.found_secrets.indexOf(`sold_for_${resource}_1`) == -1) ? "init_hidden" : "";
        storages_html += `
        	<div class="flex-element ${secret_class}" id="sold_for_${resource}_1_container">
	        	${sb.tier1[resource].name}: ${sb.tier1[resource].level}
	            <button onclick = "Storages.upgradeBuilding(1, \'${resource}\')">Up1:
	            	${Storages.getUpgradeCostBuilding(1, resource)[resource].toFixed(2)} ${resource} 
	            </button>
	        </div>`;

        var secret_class = (Player.found_secrets.indexOf(`sold_for_${resource}_2`) == -1) ? "init_hidden" : "";
        storages_html += `
        	<div class="flex-element ${secret_class}">
	        	${sb.tier2[resource].name}: ${sb.tier2[resource].level}
	            <button onclick = "Storages.upgradeBuilding(2, \'${resource}\')">Up2: 
	            	${Storages.getUpgradeCostBuilding(2, resource)[resource].toFixed(2)} ${resource} 
	            </button>
	        </div>`;

        var secret_class = (Player.found_secrets.indexOf(`sold_for_${resource}_3`) == -1) ? "init_hidden" : "";
        storages_html += `
        	<div class="flex-element ${secret_class}">
	        	${sb.tier3[resource].name}: ${sb.tier3[resource].level}
	            <button onclick = "Storages.upgradeBuilding(3, \'${resource}\')">Up3:
	            	${Storages.getUpgradeCostBuilding(3, resource)[resource].toFixed(2)} ${resource} 
	            </button>
	        </div>`;

        var secret_class = (Player.found_secrets.indexOf(`sold_for_${resource}_4`) == -1) ? "init_hidden" : "";
        storages_html += `
        	<div class="flex-element ${secret_class}">
	        	${sb.tier4[resource].name}:  ${sb.tier4[resource].level} 
	            <button onclick = "Storages.upgradeBuilding(4, '${resource}')">Up4:
	            	${Storages.getUpgradeCostBuilding(4, resource)[resource].toFixed(2)} ${resource} 
	            </button>
	        </div>`;

        resources_html += `</div>`;

		storages_html += '</div>';
    });


	html += `
	    <div class="flex-element flex-container-row"> ${resources_html}</div>
	    <div id="resources_collapse" class="flex-element flex-container-column"> 
	    	<div class="flex-element flex-container-row">
	    		${storages_html} 
	    	</div>
	    </div>`;

    html += `</div>`;
    return html;
};



Storages.increaseBuilding = function(tier, building) {
    this.buildings['tier' + tier][building].increase();
};

Storages.decreaseBuilding = function(tier, building) {
    this.buildings['tier' + tier][building].decrease();
};

Storages.upgradeBuilding = function(tier, building) {
    this.buildings['tier' + tier][building].upgrade();
};

Storages.getUpgradeCostBuilding = function(tier, building) {
	//console.log(tier + " " + building);
    return this.buildings['tier' + tier][building].getUpgradeCost();
};



var skills = ["writing", "drawing", "programming", "management"];

skills.getHTML = function() {
	var html = `<hr>
        <button class="collapsar" data-toggle="collapse" data-target="#skills_collapse">-</button>
        Skills:
        <div class="collapse in" id="skills_collapse">
            <div class="flex-container-row" id="skills">`;

	
    skills.forEach(function(skill) {
        html += `
        <div class="flex-element flex-container-column" id="${skill}">
        	<span id="${skill}_indicator"> ${skill.capitalizeFirstLetter()}: ${Player[skill].toFixed(2)}/60</span>
        	${(Player.found_secrets.indexOf('self_study') !== -1) ? `<button data-tooltip='${skill}' onclick="Player.selfStudy('${skill}')">Self-study</button>` : ''}
        	${(Player.found_secrets.indexOf('books') !== -1) ? `<button data-tooltip='${skill}' onclick="Player.books('${skill}')">Books</button>` : ''}
        	${(Player.found_secrets.indexOf('work') !== -1) ? `<button data-tooltip='${skill}' onclick="Player.work('${skill}')">Work</button>` : ''}
        	${(Player.found_secrets.indexOf('pet_project') !== -1) ? `<button data-tooltip='${skill}' onclick="Player.petProject('${skill}')">Pet-project</button>` : ''}
        </div>`;
    });
    html += `</div></div>`;
    return html;
};




function Badge(name, label, text, check_code, init_code) {
    this.name = name;
    this.label = label;
    this.text = text;
    this.check_code = check_code;
    this.init_code = init_code;
    this.reached = 0;
}

Badge.tick = function () {
    badges.db.forEach(function (badge) {
        if (!badge.reached) {
            if (typeof badge.check_code === 'function') {
                if (badge.check_code()) {
                    badge.reached = 1;
                    Player.revealSecret('badges');
                    message("Badge reached: " + badge.name);
                    if (typeof badge.init_code === 'function') {
                        badge.init_code();
                    }
                }
            }
        }
    });
};

Badge.checkResourcesGenerator = function (resource_name, badge_level) {
    return function () {
        return (Gatherer.collection[resource_name] > resources_rates[resource_name] * 0.1 * (Math.pow(10, badge_level)))
    };
};


var badges = {};

badges.db = [

    new Badge("tick 1", "Lost coordinator", "A month of your coordination is passed. You understand what's what.",
        function () { return (Gatherer.events.ticks > 30); }, function () {}),
    new Badge("tick 2", "Verified coordinator", "A ear of your coordination is passed. You steeled enough to avoid mistakes.",
        function () { return (Gatherer.events.ticks > 356); }, function () { Player.revealSecret('upgrade_department'); Player.revealSecret('cancel_event');  }),
    new Badge("tick 3", "Experienced coordinator", "A ten ear of your coordination is passed. You ready to invent something new.",
        function () { return (Gatherer.events.ticks > 356*10); }, function () { Player.revealSecret('invent');  }),
    new Badge("tick 4", "Hardened coordinator", "A century of your coordination is passed.",
        function () { return (Gatherer.events.ticks > 356*100); }, function () {}),

    
    new Badge("resources 1", "Resources dabbling", "You collect some.",
        function () { return ((Gatherer.collection.likes * 1 + Gatherer.collection.design * 10 + Gatherer.collection.money * 100 + Gatherer.collection.ideas * 1000) > 1000); }, function () { Player.revealSecret('objectives'); }),
    new Badge("resources 2", "Resources collector", "You collect many.",
        function () { return ((Gatherer.collection.likes * 1 + Gatherer.collection.design * 10 + Gatherer.collection.money * 100 + Gatherer.collection.ideas * 1000) > 1000 * 10); }, function () { Player.revealSecret('events'); }),
    new Badge("resources 3", "Resources achiever", "You have wealth.",
        function () { return ((Gatherer.collection.likes * 1 + Gatherer.collection.design * 10 + Gatherer.collection.money * 100 + Gatherer.collection.ideas * 1000) > 1000 * 100); }, function () { Player.revealSecret('sharing'); }),
    new Badge("resources 4", "Resources tycoon", "You have a huge savings.",
        function () { return ((Gatherer.collection.likes * 1 + Gatherer.collection.design * 10 + Gatherer.collection.money * 100 + Gatherer.collection.ideas * 1000) > 1000 * 1000); }, function () {}),


    new Badge("communication 1", "Talking", "Communication upgraded to level 15.",
        function () { return (Civilization.updates.communication.level >= 15); }, function () {}),
    new Badge("communication 2", "Discussing", "Communication upgraded to level 30.",
        function () { return (Civilization.updates.communication.level >= 30); }, function () {}),
    new Badge("communication 3", "Telepathy", "Communication upgraded to level 45.",
        function () { return (Civilization.updates.communication.level >= 45); }, function () {}),
    new Badge("communication 4", "Hivemind", "Communication upgraded to level 60.",
        function () { return (Civilization.updates.communication.level >= 60); }, function () {}),

    new Badge("attentiveness 1", "Attention to friends", "Attentiveness upgraded to level 15.",
        function () { return (Civilization.updates.attentiveness.level >= 15); }, function () {}),
    new Badge("attentiveness 2", "Attention to known", "Attentiveness upgraded to level 30.",
        function () { return (Civilization.updates.attentiveness.level >= 30); }, function () {}),
    new Badge("attentiveness 3", "Attention to all", "Attentiveness upgraded to level 45.",
        function () { return (Civilization.updates.attentiveness.level >= 45); }, function () {}),
    new Badge("attentiveness 4", "Non-violence communication", "Attentiveness upgraded to level 60.",
        function () { return (Civilization.updates.attentiveness.level >= 60); }, function () {}),

    new Badge("teamwork 1", "Group work", "Teamwork upgraded to level 15.",
        function () { return (Civilization.updates.teamwork.level >= 15); }, function () {}),
    new Badge("teamwork 2", "Command work", "Teamwork upgraded to level 30.",
        function () { return (Civilization.updates.teamwork.level >= 30); }, function () {}),
    new Badge("teamwork 3", "Cooperative work", "Teamwork upgraded to level 45.",
        function () { return (Civilization.updates.teamwork.level >= 45); }, function () {}),
    new Badge("teamwork 4", "Congregation work", "Teamwork upgraded to level 60.",
        function () { return (Civilization.updates.teamwork.level >= 60); }, function () {}),

    new Badge("sharing 1", "Sharing with friends", "Sharing upgraded to level 15.",
        function () { return (Civilization.updates.sharing.level >= 15); }, function () {}),
    new Badge("sharing 2", "Sharing with known", "Sharing upgraded to level 30.",
        function () { return (Civilization.updates.sharing.level >= 30); }, function () {}),
    new Badge("sharing 3", "Sharing with all", "Sharing upgraded to level 45.",
        function () { return (Civilization.updates.sharing.level >= 45); }, function () {}),
    new Badge("sharing 4", "Asceticism", "Sharing upgraded to level 60.",
        function () { return (Civilization.updates.sharing.level >= 60); }, function () {}),


    new Badge("popularization 1", "Light of Science", "Popularization upgraded to level 15.",
        function () { return (Civilization.works.popularization.level >= 15); }, function () {}),
    new Badge("popularization 2", "Trend to quantum", "Popularization upgraded to level 30.",
        function () { return (Civilization.works.popularization.level >= 30); }, function () {}),
    new Badge("popularization 3", "Viral ideas", "Popularization upgraded to level 45.",
        function () { return (Civilization.works.popularization.level >= 45); }, function () {}),
    new Badge("popularization 4", "Science-pop Rock concert", "Popularization upgraded to level 60.",
        function () { return (Civilization.works.popularization.level >= 60); }, function () {}),

    new Badge("education 1", "School", "Education upgraded to level 15.",
        function () { return (Civilization.works.education.level >= 15); }, function () {}),
    new Badge("education 2", "High School", "Education upgraded to level 30.",
        function () { return (Civilization.works.education.level >= 30); }, function () {}),
    new Badge("education 3", "University", "Education upgraded to level 45.",
        function () { return (Civilization.works.education.level >= 45); }, function () {}),
    new Badge("education 4", "Academy", "Education upgraded to level 60.",
        function () { return (Civilization.works.education.level >= 60); }, function () {}),

    new Badge("motivation 1", "Working with target", "Motivation upgraded to level 15.",
        function () { return (Civilization.works.motivation.level >= 15); }, function () {}),
    new Badge("motivation 2", "Working with sense", "Motivation upgraded to level 30.",
        function () { return (Civilization.works.motivation.level >= 30); }, function () {}),
    new Badge("motivation 3", "Target of life", "Motivation upgraded to level 45.",
        function () { return (Civilization.works.motivation.level >= 45); }, function () {}),
    new Badge("motivation 4", "Sense of life", "Motivation upgraded to level 60.",
        function () { return (Civilization.works.motivation.level >= 60); }, function () {}),

    new Badge("activism 1", "Opinion", "Activism upgraded to level 15.",
        function () { return (Civilization.works.activism.level >= 15); }, function () {}),
    new Badge("activism 2", "Changes", "Activism upgraded to level 30.",
        function () { return (Civilization.works.activism.level >= 30); }, function () {}),
    new Badge("activism 3", "Bettering", "Activism upgraded to level 45.",
        function () { return (Civilization.works.activism.level >= 45); }, function () {}),
    new Badge("activism 4", "Revolution", "Activism upgraded to level 60.",
        function () { return (Civilization.works.activism.level >= 60); }, function () {}),


    new Badge("smm 1", "Public page", "Smm upgraded to level 15.",
        function () { return (Player.departments.smm.level >= 15); }, function () {}),
    new Badge("smm 2", "Scheduled posting", "Smm upgraded to level 30.",
        function () { return (Player.departments.smm.level >= 30); }, function () {}),
    new Badge("smm 3", "Multinetwork Crossposting", "Smm upgraded to level 45.",
        function () { return (Player.departments.smm.level >= 45); }, function () {}),
    new Badge("smm 4", "Community based smm", "Smm upgraded to level 60.",
        function () { return (Player.departments.smm.level >= 60); }, function () {}),

    new Badge("design 1", "Logos", "Design upgraded to level 15.",
        function () { return (Player.departments.design.level >= 15); }, function () {}),
    new Badge("design 2", "Posters", "Design upgraded to level 30.",
        function () { return (Player.departments.design.level >= 30); }, function () {}),
    new Badge("design 3", "Booklets", "Design upgraded to level 45.",
        function () { return (Player.departments.design.level >= 45); }, function () {}),
    new Badge("design 4", "Bigboards", "Design upgraded to level 60.",
        function () { return (Player.departments.design.level >= 60); }, function () {}),

    new Badge("site 1", "Page", "Site upgraded to level 15.",
        function () { return (Player.departments.site.level >= 15); }, function () {}),
    new Badge("site 2", "Site", "Site upgraded to level 30.",
        function () { return (Player.departments.site.level >= 30); }, function () {}),
    new Badge("site 3", "Portal", "Site upgraded to level 45.",
        function () { return (Player.departments.site.level >= 45); }, function () {}),
    new Badge("site 4", "Social Network", "Site upgraded to level 60.",
        function () { return (Player.departments.site.level >= 60); }, function () {}),

    new Badge("docs 1", "Notes", "Docs upgraded to level 15.",
        function () { return (Player.departments.docs.level >= 15); }, function () {}),
    new Badge("docs 2", "Tasks", "Docs upgraded to level 30.",
        function () { return (Player.departments.docs.level >= 30); }, function () {}),
    new Badge("docs 3", "Manuals", "Docs upgraded to level 45.",
        function () { return (Player.departments.docs.level >= 45); }, function () {}),
    new Badge("docs 4", "Handbook", "Docs upgraded to level 60.",
        function () { return (Player.departments.docs.level >= 60); }, function () {}),


    new Badge("volunteers 1", "Group", "Founded 15 volunteers."),
    new Badge("volunteers 2", "Company", "Founded 30 volunteers."),
    new Badge("volunteers 3", "Community", "Founded 45 volunteers."),
    new Badge("volunteers 4", "Organization", "Founded 60 volunteers."),

    new Badge("learn 1", "", "You learn how to learning."),
       // function () { return (Gatherer.events.increase_skill < 15 && Gatherer.events.increase_skill + 1 >= 15)}),
    new Badge("learn 2", "", "You learn how to learning right."),
    new Badge("learn 3", "", "You learn how to learning fast."),
    new Badge("learn 4", "", "You learn how to learning things you needed."),



    new Badge("share 1", "Ready to learn", "You shared your knowledge 15 times.",
        function () { return (Gatherer.events.knowledge_sharing >= 15); }, function () { Player.revealSecret('skills'); Player.revealSecret('self_study'); }),
    new Badge("share 2", "Ready to read", "You shared your knowledge 30 times.",
        function () { return (Gatherer.events.knowledge_sharing >= 30); }, function () { Player.revealSecret('books'); }),
    new Badge("share 3", "Ready to work", "You shared your knowledge 45 times.",
        function () { return (Gatherer.events.knowledge_sharing >= 45); }, function () { Player.revealSecret('work'); }),
    new Badge("share 4", "Ready to lead", "You shared your knowledge 60 times.",
        function () { return (Gatherer.events.knowledge_sharing >= 60); }, function () { Player.revealSecret('pet_project'); }),


    new Badge("selfStudy 1", "", "15 Self Studies"),
    new Badge("selfStudy 2", "", "30 Self Studies"),
    new Badge("selfStudy 3", "", "45 Self Studies"),
    new Badge("selfStudy 4", "", "60 Self Studies"),

    new Badge("books 1", "", "15 Books"),
    new Badge("books 2", "", "30 Books"),
    new Badge("books 3", "", "45 Books"),
    new Badge("books 4", "", "60 Books"),

    new Badge("work 1", "", "15 Works"),
    new Badge("work 2", "", "30 Works"),
    new Badge("work 3", "", "45 Works"),
    new Badge("work 4", "", "60 Works"),

    new Badge("petProject 1", "", "15 Pet-projects"),
    new Badge("petProject 2", "", "30 Pet-projects"),
    new Badge("petProject 3", "", "45 Pet-projects"),
    new Badge("petProject 4", "", "60 Pet-projects"),




    new Badge("culture 1", "", "You feel the cultural growth."),
    new Badge("culture 2", "", "You feel the cultural rise."),
    new Badge("culture 3", "", "You led a moral imperative."),
    new Badge("culture 4", "", "You are part of the cultural revolution."),



    new Badge("writing 1", "", "Mom thinks that you write as Dostoevsky."),
    new Badge("writing 2", "", "You think that you write as Dostoevsky."),
    new Badge("writing 3", "", "Everyone thinks that you write as Dostoevsky."),
    new Badge("writing 4", "", "Dostoevsky thinks you write as Dostoevsky."),

    new Badge("drawing 1", "", "You can draw a cat."),
    new Badge("drawing 2", "", "You can draw a man."),
    new Badge("drawing 3", "", "You can draw site."),
    new Badge("drawing 4", "", "You do can draw a cat."),

    new Badge("programming 1", "", "You feel the difference between a code and a broken encoding."),
    new Badge("programming 2", "", "You feel the difference between a Class and an Object."),
    new Badge("programming 3", "", "You feel the difference between Mixins and Traits."),
    new Badge("programming 4", "", "You feel the difference between the Wrapper, the Proxy, the Facade and the Composite."),

    new Badge("management 1", "", "You think that people do not listen to you."),
    new Badge("management 2", "", "You think that people are listening to you."),
    new Badge("management 3", "", "You know that people are listening to you."),
    new Badge("management 4", "", "You know that people do not listen to you."),


    new Badge("act 1", "", "You act 15 times."),
    new Badge("act 2", "", "You act 30 times."),
    new Badge("act 3", "", "You act 45 times."),
    new Badge("act 4", "", "You act 60 times."),


    new Badge("likes 1", "Likes dabbling", "You earned 1000 likes.",
        Badge.checkResourcesGenerator('likes', 1), function () {}),
    new Badge("likes 2", "Likes collector", "You earned 10000 likes.",
        Badge.checkResourcesGenerator('likes', 2), function () {}),
    new Badge("likes 3", "Likes achiever", "You earned 100000 likes.",
        Badge.checkResourcesGenerator('likes', 3), function () {}),
    new Badge("likes 4", "Likes tycoon", "You earned 1000000 likes.",
        Badge.checkResourcesGenerator('likes', 4), function () {}),

    new Badge("design 1", "Design dabbling", "You earned 100 design.",
        Badge.checkResourcesGenerator('design', 1), function () {}),
    new Badge("design 2", "Design collector", "You earned 1000 design.",
        Badge.checkResourcesGenerator('design', 2), function () {}),
    new Badge("design 3", "Design achiever", "You earned 10000 design.",
        Badge.checkResourcesGenerator('design', 3), function () {}),
    new Badge("design 4", "Design tycoon", "You earned 100000 design.",
        Badge.checkResourcesGenerator('design', 4), function () {}),

    new Badge("money 1", "Money dabbling", "You earned 10 money.",
        Badge.checkResourcesGenerator('money', 1), function () {}),
    new Badge("money 2", "Money collector", "You earned 100 money.",
        Badge.checkResourcesGenerator('money', 2), function () {}),
    new Badge("money 3", "Money achiever", "You earned 1000 money.",
        Badge.checkResourcesGenerator('money', 3), function () {}),
    new Badge("money 4", "Money tycoon", "You earned 10000 money.",
        Badge.checkResourcesGenerator('money', 4), function () {}),

    new Badge("ideas 1", "Ideas dabbling", "You earned 1 ideas.",
        Badge.checkResourcesGenerator('ideas', 1), function () {}),
    new Badge("ideas 2", "Ideas collector", "You earned 10 ideas.",
        Badge.checkResourcesGenerator('ideas', 2), function () {}),
    new Badge("ideas 3", "Ideas achiever", "You earned 100 ideas.",
        Badge.checkResourcesGenerator('ideas', 3), function () {}),
    new Badge("ideas 4", "Ideas tycoon", "You earned 1000 ideas.",
        Badge.checkResourcesGenerator('ideas', 4), function () {})

];

badges.achieve = function (name) {
    badges.db.filter(function (val) {
        return (val.name == name) ? 1 : 0;
    }).forEach(function (value, id, array) {
        array[0].reached = 1;
        Player.revealSecret('badges');
        message("Badge reached: " + array[0].name);
    });
};

badges.getHTML = function () {

    var html = `<hr>
        <button class="collapsar" data-toggle="collapse" data-target="#badges_collapse">-</button>
        <span title="some achievements open next parts of game-play">Achievements:</span>
        <div class="collapse in" id="badges_collapse">
            <div id="badges">`;

    badges.db.filter(function (badge) {
        return badge.reached;
    }).forEach(function (val, id, arr) {
        html += `<div class="badge_element"><span class="badge_name">${val.label}. ${val.text}</span></div>`;
    });
    html += `</div></div>`;
    return html;
};

function Startup(name, label, size, text, cost, reward) {
    this.name = name;
    this.label = label;
    this.size = size;
    this.text = text;
    this.cost = cost;
    this.reward = reward;
    this.workplace = new Workplace(name, cost, ((size * 0.1) + 1.2), text);
}

Startup.generator = function (skill_name) {
    var sizes = ['solo', 'small', 'medium', 'big', 'gigantic'];

    var skill_level = Player[skill_name];
    var size = 0;

    var name = '';
    var label = '';
    var text = '';
    var cost = {};
    var reward = {};


    //function r(n) { return Math.floor(Math.random()*n); }


    if                               (skill_level < 15) {
        size = rand(1,2);
    } else if   (skill_level >= 15 && skill_level < 30) {
        size = rand(1,3);
    } else if   (skill_level >= 30 && skill_level < 45) {
        size = rand(1,4);
    } else if   (skill_level >= 45) {
        size = rand(1,5);
    }

    //console.log(size);

    for (var i = 0; i < size; i++) {
        var cost_res = resources[rand(0,3)];
        text += `Сonsumes ${cost_res}. `;
        cost[cost_res] = (cost[cost_res]) ? (resources_rates[cost_res] + cost[cost_res]) : resources_rates[cost_res];
        var reward_res = resources[rand(0,3)];
        text += `Produce ${reward_res}. `;
        reward[reward_res] = (reward[reward_res]) ? (resources_rates[reward_res] + reward[reward_res]) : resources_rates[reward_res];
    }

    name = skill_name + '_' + size;
    if (sizes < 0 && sizes > 4) alert(size);
    label = sizes[size].capitalizeFirstLetter() + ' ' + skill_name;

    console.log(cost, reward);
    return new Startup(name, label, size, text, cost, reward);
};

Startup.tick = function () {
    startups.db.forEach(function (startup, id) {
        if(startups.db[id].workplace.workers == 0) return false;
            var cost_per_tick = {};
            for (key in startups.db[id].cost) {
                cost_per_tick[key] = (startups.db[id].cost[key]) * adjustment;
            }

            var reward_per_tick = {};
            for (key in startups.db[id].reward) {
                reward_per_tick[key] = (startups.db[id].reward[key]) * adjustment;
            }

        if (Player.withdrawArray(cost_per_tick, 1)) Player.rewardArray(reward_per_tick, 1);    
    }); 
};

Startup.getHTML = function () {
    var html = `<hr>
        <button class="collapsar" data-toggle="collapse" data-target="#startups_collapse">-</button>
        Startups:
        <div class="collapse in" id="startups_collapse">
            <div id="startups">`;

    //for (var key in Startup.workplace) {
    startups.db.forEach(function (startup, id, arr) {
        html += `<div class="startup_element">
            <span class="startup_name">${startup.label}.</span>
            <span class="startup_text"> "${startup.text}"</span>`;

        var upgrade_cost = Startup.getUpgradeCostWork(id);
        var price = [];
        for (var resource_name in upgrade_cost) {
            price.push(`${upgrade_cost[resource_name].toFixed(2)} ${resource_name}`);
        }
        price = price.join(', ');

        //console.log(upgrade_cost);
        html += `
        <div class="flex-element">
            <button onclick="Startup.upgrade('${id}');">Up: ${price}</button>
        </div>

            <span id="${id}_volunteers">Workers: ${startups.db[id].workplace.workers}/${Civilization.updates.teamwork.level}</span>
            <button class = "" onclick="Startup.increaseWorker('${id}');"> + </button>
            <button class = "" onclick="Startup.decreaseWorker('${id}');"> - </button>
        </div>`;
    });

    html += `</div></div>`;
    return html;    
};


Startup.increaseWorker = function (id) {
    startups.db[id].workplace.increase();
};

Startup.decreaseWorker = function (id) {
    startups.db[id].workplace.decrease();
};

Startup.upgrade = function (id) {
    startups.db[id].workplace.upgrade();
};

Startup.getUpgradeCostWork = function(id) {
    return startups.db[id].workplace.getUpgradeCost();
};




var startups = {};

startups.db = [];

startups.found = function (skill_name) {
    Player.revealSecret('startups');

    var startup = Startup.generator(skill_name);
    startups.db.push(startup);
    return startup;
};






/*startups.do = function (name) {
    if (Player.action_points < 1) {
        message("Not enough action points.");
        return false;
    }

    console.log(name);

    var startup = startups.db.filter(function (val) {
        return (val.name == name) ? 1 : 0;
    })[0];

    console.log(startup);

    var cost_checked = 0;
    for (var key in startup.cost) {
        if (Player[key] > startup.cost[key]) {
            cost_checked++;
        }
        else {
            message("Not enough " + key + ".");
        }
    }

    if (cost_checked == startup.cost.length) {
        for (var key in startup.cost) {
            Player.withdraw(key, startup.cost[key]);
        }
        for (var key in startup.reward) {
            Player.reward(key, startup.reward[key]);
        }

        Player.action_points--;
    }

    console.log(startup);

}; */


function Objective(name, label, text, requires, cost) {
    this.name = name;
    this.label = label;
    this.text = text;
    this.requires = requires;
    this.cost = cost;
    this.reached = 0;

    this.is_reached = is_reached;
}

var objectives = {};
objectives.db = [
    new Objective('sold_for_knowledge_1', 'Perseverance', 'Description', ['learn 1'], {knowledge: 10}),
    new Objective('sold_for_knowledge_2', 'Discipline', 'Description', ['learn 2', 'sold_for_knowledge_1'], {knowledge: 20}),
    new Objective('sold_for_knowledge_3', 'Motivation', 'Description', ['learn 3', 'sold_for_knowledge_2'], {knowledge: 30}),
    new Objective('sold_for_knowledge_4', 'Purposefulness', 'Description', ['learn 4', 'sold_for_knowledge_3'], {knowledge: 40}),

    new Objective('sold_for_likes_1', 'Social network group', 'Allows to make groups in the VC and FB', ['likes 1'], {likes: 1000}),
    new Objective('sold_for_likes_2', 'Instagram', 'Upload photos from event', ['sold_for_likes_1'], {likes: 10000}),
    new Objective('sold_for_likes_3', 'Youtube channel', 'Upload lectures video', ['sold_for_likes_2'], {likes: 100000}),
    new Objective('sold_for_likes_4', 'Site', 'Let all information about you knowledge be available in one place', ['sold_for_likes_3'], {likes: 10000000}),

    new Objective('sold_for_design_1', 'Business cards', 'The face of your company', ['design 1'], {design: 100}),
    new Objective('sold_for_design_2', 'Posters', 'A more quality poster is leads to greater attendance', ['sold_for_design_1'], {design: 1000}),
    new Objective('sold_for_design_3', 'Booklets', 'Show an ingenious engineering solution for all', ['sold_for_design_2'], {design: 10000}),
    new Objective('sold_for_design_4', 'Handbooks', 'Let everyone see how you are organized', ['sold_for_design_3'], {design: 100000}),
    
    new Objective('sold_for_money_1', 'Purse', 'You spend a pocket money on a project', ['money 1'], {money: 10}),
    new Objective('sold_for_money_2', 'Safe', 'Several people share their money for a project', ['sold_for_money_1'], {money: 100}),
    new Objective('sold_for_money_3', 'Bank account', 'You have a few benefactors', ['sold_for_money_2'], {money: 1000}),
    new Objective('sold_for_money_4', 'Charitable Foundation', 'You\'re so big company that now you have your own fund', ['sold_for_money_3'], {money: 10000}),

    new Objective('sold_for_ideas_1', 'Repetition', 'Importantly! Do not forget apples', ['ideas 1'], {ideas: 1}),
    new Objective('sold_for_ideas_2', 'Astro-event', 'Ideas knowledge not fall down from the sky', ['sold_for_ideas_1'], {ideas: 10}),
    new Objective('sold_for_ideas_3', 'Party', 'The best ideas are born during leisure', ['sold_for_ideas_2'], {ideas: 100}),
    new Objective('sold_for_ideas_4', 'Festival', 'You knowledge be very experienced if you don\'t die', ['sold_for_ideas_3'], {ideas: 1000}),

];


objectives.buy = function (name) {
    //console.log(name);
    objectives.db.filter(function (val) {
        return (val.name == name) ? 1 : 0;
    }).forEach(function (objective, id, array) {
        if (Player.withdrawArray(objective.cost)) {
            message("Objective reached: " + objective.name);
            array[0].reached = 1;
            Player.revealSecret(objective.name);
        }
    });
};

objectives.getHTML = function () {
    var html = `<hr>
        <button class="collapsar" data-toggle="collapse" data-target="#objectives_collapse">-</button>
        Objectives:
        <div class="collapse in" id="objectives_collapse">
            <div id="objectives">`;
    
    objectives.db.filter(function (objective) {
        return objective.is_reached();
    }).forEach(function (objective, id, arr) {

        html += `
        <div class="objective_element">
            <span class="objective_name">`;
                if (!objective.reached) {
                    html += `<button onclick="objectives.buy('${objective.name}')">buy</button>`;
                }
                    html += `${objective.label}. ${objective.text} [`;
            
                for (var key in objective.cost) {
                   html += `${key}: ${objective.cost[key]}`;
                }
                html += `] 
            </span>
        </div>`;
    });
    html += `</div></div>`;
    return html;
};

function Action(name, text, requires, code) {
    this.name = name;
    this.text = text;
    this.requires = requires;
    this.code = code;

    this.is_reached = is_reached;




    return this;
}

var actions = {};
actions.db = [

    // raw work
    new Action("Rewriting", "Trying to get some resources. Writing boring texts for which no one knowledge give money.", ["writing 1"], function(){actions.rawWork("writing");}),
    new Action("Logo Drawing", "Trying to get some resources. Seven logo options, zero sane.", ["drawing 1"], function(){actions.rawWork("drawing");}),
    new Action("Coding", "Trying to get some resources. define(true, false); // Happy debugging!", ["programming 1"], function(){actions.rawWork("programming");}),
    new Action("Calling", "Trying to get some resources. Cold sale as the heart of the former girlfriend.", ["management 1"], function(){actions.rawWork("management");}),


    // writing
    new Action("Likes to random", "Transform likes to random. You newer know!", ["writing 1"], function () {actions.randomReward("writing");}),
    new Action("Likes to design", "Fun-art. Win or fail: You newer know!", ["writing 2"], function () {actions.shiftReward("writing", 1);}),
    new Action("Likes to money", "Call for assistance. The right to give money 15x4 must be earned.", ["writing 3"], function () {actions.shiftReward("writing", 2);}),
    new Action("Likes to ideas", "Fest video. Viral video about our community.", ["writing 4"], function () {actions.shiftReward("writing", 3);}),

    // drawing
    new Action("Design to random", "Transform design to random. You newer know!", ["drawing 1"], function () {actions.randomReward("drawing");}),
    new Action("Design to likes", "Posters for the Event. DIN font, neat style, bold colors.", ["drawing 2"], function () {actions.shiftReward("drawing", 3);}),
    new Action("Design to ideas", "Kat's pictures. Picture for ideas search post.", ["drawing 3"], function () {actions.shiftReward("drawing", 2);}),
    new Action("Design to money", "Design to money", ["drawing 4"], function () {actions.shiftReward("drawing", 1);}),

    // programming
    new Action("Money to random", "Transform money to random. You newer know!", ["programming 1"], function () {actions.randomReward("programming");}),
    new Action("Money to design", "Apples for repetition. Twenty kilograms of apples. Popularization never been so heavy.", ["programming 2"], function () {actions.shiftReward("programming", 3);}),
    new Action("Money to ideas", "Advertising. We all hate adds", ["programming 3"], function () {actions.shiftReward("programming", 1);}),
    new Action("Money to likes", "Order merchandising. Full set of pen, notebook and t-shirt!", ["programming 4"], function () {actions.shiftReward("programming", 2);}),

    // management
    new Action("Ideas to random", "Transform ideas to random. You newer know!", ["management 1"], function () {actions.randomReward("management");}),
    new Action("Ideas to likes", "We all together are 15x4.", ["management 2"], function () {actions.shiftReward("management", 1);}),
    new Action("Ideas to money", "Astronomical Event. Looking stars in night.", ["management 3"], function () {actions.shiftReward("management", 3);}),
    new Action("Ideas to design", "It is necessary to draw it up yesterday.", ["management 4"], function () {actions.shiftReward("management", 2);}),


    // special
    new Action("Dark Ritual", "You have waited your reward.", ["tick 4"], function(){
        if (Player.volunteers >= 1) {
            Player.volunteers--;
            Player.knowledge++;
            draw_all();
            message('Your knowledge has been strengthened by infernal knowledge.');
        }
        else {
            message('Not enough free volunteers');
        }
    })

];





actions.do = function (name) {
    if (Player.action_points < 1) {
        message("Not enough action points.");
        return false;
    }

    //console.log(name);
    actions.db.filter(function (val) {
        return (val.name == name) ? 1 : 0;
    }).forEach(function (action, id, array) {
        //console.log(action);
        action.code();
        Player.action_points--;
    });
};

actions.getHTML = function () {
    var html = `<hr>
        <button class="collapsar" data-toggle="collapse" data-target="#actions_collapse">-</button>
        <div id="your_ap">Action Points: <span id="ap_indicator">${Player.action_points.toFixed(2)}</span></div>
        Actions:
        <div class="collapse in" id="actions_collapse">
            <div id="actions">`;

        actions.db.filter(function (action) {
            return action.is_reached();
        }).forEach(function (action, id, arr) {
            Player.revealSecret('actions');
            html += `
            <div class="action_element">
                <button onclick="actions.do('${action.name}')">do</button>
                <span class="action_name">${action.name}.</span>
                <span class="action_text">"${action.text}"</span>
           </div>`;
        });
        html += `</div></div>`;
        return html;
};


// ######################################################################

// Actions Library

actions.rawWork = function(skill_name) {
    var k = 0.1;
    Player.reward(skill_to_resource[skill_name], (1 + Player[skill_name]/60) * resources_rates[skill_to_resource[skill_name]] * k);
};

actions.randomReward = function(skill_name) {
    if (Player[skill_name] >= resources_rates[skill_to_resource[skill_name]]) {
        Player.withdraw(skill_to_resource[skill_name], resources_rates[skill_to_resource[skill_name]]);
        var new_resource = JSON.parse(JSON.stringify(resources_rates));
        delete new_resource[skill_to_resource[skill_name]];
        new_resource = new_resource[rand(0,2)];
        Player.reward(new_resource, resources_rates[new_resource]);
    } else { message("Not enough " + skill_to_resource[skill_name] + '.'); }
};

actions.shiftReward = function(skill_name, shift) {
    var from_resource = skill_to_resource[skill_name];
    var new_resource = resources[(resources.indexOf(from_resource)+shift)%4];

    console.log(from_resource, new_resource);
    console.log(resources[(resources.indexOf(from_resource)+shift)%4], (resources.indexOf(from_resource)+shift)%4 );
    console.log((resources.indexOf(from_resource)+shift), resources.indexOf(from_resource));
    console.log(from_resource, resources_rates[from_resource]);
    console.log(new_resource, resources_rates[new_resource]);


    if (Player[from_resource] >= resources_rates[from_resource]) {
        Player.withdraw(from_resource, resources_rates[from_resource]);
        Player.reward(new_resource, resources_rates[new_resource]);
    } else { message("Not enough " + skill_to_resource[skill_name] + '.'); }
};






var event_counter = 0;
var canceled_event_counter = 0;

function Event(event_number, cost, lectures) {
    this.event_number = event_number;
    this.cost = cost;
    this.lectures = lectures;
}


Event.generator = function () {
    lectures.db.sort(function() { return Math.round(Math.random()); } );

    var tumbler = Math.round(Math.random());
    var first = Math.random();
    var second = Math.random();

    var price_of_responsibility = (event_counter) ? Math.pow(1 + 0.3 * event_counter,  Math.pow(1 + event_counter/60, 1 + (4/event_counter))) : 1;


    var cardinalities = {
        likes: (tumbler) ? first : second,
        design: (!tumbler) ? first : second,
        money: (tumbler) ? 1 - first : 1 - second,
        ideas: (!tumbler) ? 1 - first : 1 - second
    };

    var cost = {
        likes:  Math.round(1000 * cardinalities.likes * price_of_responsibility),
        design: Math.round(100 * cardinalities.design * price_of_responsibility),
        money:  Math.round(10 * cardinalities.money * price_of_responsibility),
        ideas:  Math.round(1 * cardinalities.ideas * price_of_responsibility)
    };

    var balance_sum = cost.likes * 1 + cost.design * 10 + cost.money * 100 + cost.ideas * 1000;
    var balance_ratio = balance_sum/price_of_responsibility;

    event_counter++;
    message("Generate new event. Counter: " + event_counter + ". Price of responsibility: " + price_of_responsibility.toFixed(2) + ". Balance sum: " + balance_sum.toFixed(0) + ". Balance ratio:" + balance_ratio.toFixed(0));

    return new Event(event_counter, cost, [lectures.db[0], lectures.db[1], lectures.db[2], lectures.db[3]]);
};


Event.holdEvent = function(event_id) {
    if (Player.withdrawArray(events.db[event_id].cost)) {
        events.db[event_id].lectures.forEach(function(lecture, id, arr) {
            if (!lecture.is_performed) {
                Player.knowledge++;
                Lecture.hype += 15;
                Player.revealSecret('knowledge');
            }
            lecture.is_performed++;
            Player.action_points += lecture.is_performed;
            Lecture.hype += lecture.is_performed;
        });

        events.db.splice(event_id, 1);
        this.invent();
        draw_all();
    }
};

Event.cancelEvent = function(event_id) {
    canceled_event_counter++;
    Player.action_points += canceled_event_counter;
    events.db.splice(event_id, 1);
    this.invent();
    draw_all();
};

Event.invent = function () {
    if (Player.action_points < 1) {
        message("Not enough action points.");
        return false;
    }

    events.db.push(Event.generator());
};


Event.inventButton = function () {
    if (Player.action_points < 1) {
        message("Not enough action points.");
        return false;
    }
    Player.action_points--;

    this.invent();
};

Event.getHTML = function () {
    var html = `<hr>
        <button class="collapsar" data-toggle="collapse" data-target="#events_collapse">-</button>
            Events:
        <button class = "init_secret"  id="invent_container" onclick="Event.inventButton();">Invent a New Event</button>
        <div class="collapse in" id="events_collapse">
            <div class="flex-container-row" id="events">`;

    var performed_lectures = 0;
    lectures.db.forEach(function(lecture) { if (lecture.is_performed) performed_lectures++; });

    events.db.forEach(function (event, id) {
        html += `
        <div class="flex-element"> 
            <button id="hold_event_container" onclick="Event.holdEvent('${id}')">Hold Event</button>`;
            var secret_class = (Player.found_secrets.indexOf("cancel_event") == -1) ? "init_secret" : "";
            html += `
            <button class="${secret_class}" onclick="Event.cancelEvent('${id}')">Cancel Event</button>
            <br>Cost:
            <div class="flex-container-row">`;
                for (var key in event.cost) {
                    html += `<div class="flex-element">${key.capitalizeFirstLetter()}: ${event.cost[key]}</div>`;
                }
                html += `
                    </div>
                    <span title="New lectures give you 1 knowledge point"> 
                        Lectures (performed ${performed_lectures} from ${lectures.db.length}) :
                    </span>`;

            event.lectures.forEach(function (lecture) {
            html += `
                <div class="event_element">`;
                    var lecture_badge = lecture.is_performed ? '' : 'New!';
                    html += `
                    <span class="lecture_name" title="${lecture.text}">${lecture_badge} ${lecture.name}. ${lecture.lecturer_name}</span>
                </div>`;
        });
            html += `
        </div>`;
    });
    
    html += `</div></div>`;
    return html;
};




var events = {};

events.db = [];


function Lecture(lecturer_name, name, text, url, cost) {
	this.lecturer_name = lecturer_name;
    this.name = name;
    this.text = text;
    this.url = url;
	this.cost = cost;
    this.patience = (420 - Player.volunteers_memory) * 0.1 + Lecture.hype + Player.knowledge + Civilization.happiness + Player.enthusiasm;
    this.is_performed = 0;
}

	Lecture.hype = 0;
	Lecture.accepted_lectures_counter = 0;

 Lecture.generateLecture = function(old_lecturer) {
 	var lecturer_name = "";
 	if (old_lecturer) {
 		lecturer_name = old_lecturer;
 	} 
 	else {
	 	var first_name = ['Екатерина', 'Оксана', 'Александр', 'Максим', 'Евгений', 'Григорий', 'Николай'];
	 	var second_name = ['Хомяк', 'Морж', 'Рак', 'Бро', 'Зло', 'Добро', 'Сыч', 'Попович'];
	 	lecturer_name = first_name[Math.floor(Math.random() * first_name.length)] + " " + 
	 						second_name[Math.floor(Math.random() * second_name.length)];
 	}


 	var noun = ["Гарри Поттер", "15х4", "Биологическое оружие", "Космическая станция", "Атомные реакторы", "Садоводство", "Дзен", "Зомби", "Наркотики", "ГМО", "Хофштадтер", "Проституция", "Торговля людьми", "Рыбалка"];
 	var second_noun = ["методы", "фунции", "генератор", "оружие", "открытие", "создание", "искусство", "принципы", "основы", "попытка", "метафизика", "последствия", "проявление", "последствия", "причины"];
 	var adjective = ["рационального", "социального", "случайного", "массового", "наименьшего", "сознательного", "принципиального", "нормального", "культурного", "медленного", "качественного", "Кантовского", "философского"];
 	var supplement = ["мышления", "менеджмента", "значения", "поражения", "котика", "существования", "управления", "генератора", "употребления", "обьяснения", "познания", "принципа", "императива"];

 	var name = noun[Math.floor(Math.random() * noun.length)] + " как " + 
 			second_noun[Math.floor(Math.random() * second_noun.length)] + " " + 
 			adjective[Math.floor(Math.random() * adjective.length)] + " " + 
 			supplement[Math.floor(Math.random() * supplement.length)];

 			//message(name + ". " + lecturer_name);
 	var cost = Lecture.generate_offered_lecture_cost();

 	var new_lecture = new Lecture (lecturer_name, name, " ", "https://15x4.org/lecture/random/", cost);
 	if (!old_lecturer) lectures.offered.push(new_lecture);

 	return new_lecture;
 };

 Lecture.accept_lecture = function(lecture_id) {
 	if (Player.action_points < 1 ) {
        message("Not enough action points.");
        return false;
	}

 	if (Player.withdrawArray(lectures.offered[lecture_id].cost)) {
	    Player.action_points--;
	    lectures.db.push(lectures.offered[lecture_id]);
	 	lectures.offered.splice(lecture_id, 1);
	 	console.log("Lecture has accepted");
	 	Lecture.accepted_lectures_counter++;
 	}
 };

Lecture.skip_lecture = function(lecture_id) {
	if (Player.action_points < 1) {
		message("Not enough action points.");
		return false;
	}
	else {
		Player.action_points--;
		var lecture = lectures.offered[lecture_id];
		var name = lecture.lecturer_name;
		lectures.offered[lecture_id] = Lecture.generateLecture(name);
	}
};

Lecture.addTime = function(lecture_id) {
	if (Player.action_points < 1) {
		message("Not enough action points.");
		return false;
	}
	else {
		Player.action_points--;
		lectures.offered[lecture_id].patience += (420 - Player.volunteers_memory) * 0.1 + Lecture.hype + Player.knowledge + Civilization.happiness + Player.enthusiasm;
	}
};

 Lecture.generate_offered_lecture_cost = function () {
 	var random_resource = resources[Math.floor(Math.random() * resources.length)];
 	var random_resource_cost = resources_rates[random_resource] * (1 + Lecture.accepted_lectures_counter);
 	var offered_lecture_cost = {};

 	offered_lecture_cost[random_resource] = random_resource_cost;
 //	console.log(offered_lecture_cost);
	return offered_lecture_cost;
 	
 };

 Lecture.tick = function () {
 	lectures.offered.forEach(function (lecture, id) {
 		if (lectures.offered[id].patience > 0) lectures.offered[id].patience--;
 		else {
 			message("Lecturer has disappointed and gone");
 			lectures.offered.splice(id, 1);
 		}
 	});

 	if (Lecture.hype > 0) {
 		if (rand(0, 100) < Lecture.hype * 0.1) {
 			Lecture.generateLecture();
 			message("New lecturer had come");
 			Player.revealSecret('offered_lecture');
 		}
 		Lecture.hype--;
 	}
 };

 Lecture.getHTML = function() {

 	var html = `<hr>
    <div>Offered lectures. Hype:  
    	<span id = "hype"></span>
    </div>
    <button class="collapsar" data-toggle="collapse" data-target="#offered_lecture_collapse">-</button>
    <button id="new_lecture" class = "cheat" onclick="Lecture.generateLecture();">Generate new lecture</button>
    <div id = "offered_lecture_collapse">
    	<div class="container collapse in" id = "offered_lectures_container">`;



    lectures.offered.forEach(function (lecture, id, arr) {
        for (var name in lecture.cost) break;
            var cost = lecture.cost[name];

		var timer = (lecture.patience < 60) ? ` (leave after ${lecture.patience.toFixed(0)}) ` : '';

        html += `
        <div class="offered_lecture_element">
        	<button onclick = "Lecture.accept_lecture(${id});">Accept</button>
       		<button onclick = "Lecture.skip_lecture(${id});">Change Theme</button>
       		<button onclick = "Lecture.addTime(${id});">Add time</button>
        	<span class="offered_lecture_name">
        		${lecture.lecturer_name}. ${lecture.name} (need ${cost} ${name})
        		${timer}
        	</span>
        </div>`;

    });

    html += `</div></div>`;
    return html;
 };


var lectures = {};

// ruby -e '(1..60).each { |i| puts "new Lecture(\"#{i}\", \"#{i}\"),\n" }'

lectures.offered = [];

lectures.db = [
    new Lecture("Ася Казанцева", "15 минут про никотин и алкоголь", "Табачный куст вырабатывает никотин для того, чтобы сделать гадость насекомым. Как так получилось, что вещество-инсектицид одновременно оказалось наркотиком? Большое преимущество алкоголя перед никотином - меньшая вероятность развития физической зависимости. Но если вы в нее все же вляпались - то лучше бы уж вы курили! Я расскажу конкретные признаки, которые позволяют вовремя заподозрить, что у вас сформировались не совсем здоровые отношения с алкоголем или никотином", "https://www.youtube.com/watch?v=sI5d5lBwn8c"),
    new Lecture("Александр Гапак", "15 минут про Искусственный Интеллект","Что такое Искусственный Интеллект, каких он бывает видов, как устроен внутри? Будут ли у него чувства и эмоции, захватит ли он человечество или будет нам верным помощником?", "https://www.youtube.com/watch?v=JW78WYT8HU4"),
    new Lecture("Александр Гапак", "15 минут про корабли EVE Online", "Благодаря усилиям инженеров четырех рас и шести независимых фракций, верфи Нового Эдема выпускают более 300 различных корпусов кораблей, разбитых на более чем 30 разных классов. В своей лекции я расскажу, какие корабли вы встретите, выйдя из дока.", "https://www.youtube.com/watch?v=dO5gVvSiW30"),
    new Lecture("Таня Бушенева", "15 минут про ловушки психики", "Наша психика иногда поступает с нами очень подло и совсем не способствует нашему выживанию, успеху и счастью. Может, понимания, что мы иногда ведем себя не умнее, чем голуби, будет достаточно, чтобы выбраться из ловушки?","https://www.youtube.com/watch?v=Pru7mZz4W4E"),
    new Lecture("Богдан Колчигин", "15 минут о теории хаоса", "Hазвание будоражит фантазию, но попытки близкого знакомства часто упираются в суровую математику и странную терминологию. Попробуем с безопасного расстояния разобраться, чем занимается теория хаоса и почему её не любят синоптики (но должны полюбить мы).", "https://www.youtube.com/watch?v=yyu-cKn25SI"),
    new Lecture("Александр Гапак", "15 минут про 15х4", "15х4 — это сообщество молодых ученых и фанатов науки. Мы хотим, чтобы люди выступали и делились знаниями. Наша цель — создать крупное движение популяризато", "https://www.youtube.com/watch?v=MR4a1v8qVa4"),
    new Lecture("Александр Гапак", "15 минут о теории относительности", "Теория относительности - один из величайших прорывов физики, изменивший наше понимание вселенной. Вместе с тем, она изящна и доступна даже для детей. На множестве примеров я расскажу об искривлении времени при движении с околосветовой скоростью.", "https://www.youtube.com/watch?v=Ls9fKgdm18k"),
    new Lecture("Богдан Колчигин", "15 минут про самосознание", "Кто смотрит вашими глазами, озвучивает ваши мысли, слушает ваш внутренний диалог? Кто такой \"я\", есть ли у него своё мнение, где он находится и как он там оказался? На всё это у современной нейрофизиологии есть свой вариант ответа, и с ним стоит ознакомиться, потому что он касается вас самым непосредственным образом", "https://www.youtube.com/watch?v=oMqOEllecYg"),
    new Lecture("Александр Гапак", "15 минут об устройстве силы воли", "Я хочу поговорить о силе воли, о нашем механизме достижения целей. Можем ли мы управлять своими желаниями? Полезно ли ругать себя? Как страх и усталость влияют на наши решения?", "https://www.youtube.com/watch?v=uMhgsd4QXZQ"),
    new Lecture("Алиса Власенко", "15 минут о вреде ЗОЖ-1", "Это первая часть лекции о заблуждениях насчет здорового образа жизни: о том, почему детокс не работает, но все равно может улучшить ваше самочувствие, и почему он может быть вреден для вас и действительно опасен для вашей бабушки; о диетах для здоровых и больных и о шлаках.", "https://www.youtube.com/watch?v=AYsvzox92RI"),
    new Lecture("Александр Коляда", "15 минут о биологии гомосексуальности", "Что мы знаем о гомосексуальности в природе? Есть ли гены гомосексуальности и можно ли ее смоделировать на животных? Я расскажу об этом и о современных научных взглядах на причины и эволюционное значение этого явления.", "https://www.youtube.com/watch?v=TyUqxYVMR90"),
    new Lecture("София Зимницкая", "15 минут про изучение языков", "Изучение языка не сводится к скучному заучиванию слов и грамматики. Приходите, и мы поговорим о том, почему любимый сериал — лучший помощник в изучении языка и как за полгода сделать то, что раньше растягивалось на несколько лет.","https://www.youtube.com/watch?v=gGBOTszgW-Y"),
    new Lecture("Ульяна Громова", "15 минут про мозг и музыку", "Как работает наш мозг во время обучения? Что происходит, когда мы осваиваем новый музыкальный инструмент, учимся рисовать или изучаем новый язык? Что происходит с нашим мозгом, когда мы перестаем учиться, и почему так важно учиться новому, даже если вам 80 лет?", "https://www.youtube.com/watch?v=F2arDtUpx_M"),
    new Lecture("Анастасия Кондратьева", "15 минут об Игре Престолов", "Речь пойдет о проекте, который перевернул мир фэнтези и изменил правила игры. Нет сил ждать продолжения Игры престолов? Хочешь узнать, что замыслил автор книг?", "https://www.youtube.com/watch?v=pNGYp6gf6FI"),
    new Lecture("Борис Мороз", "15 минут про японские цифры", "Японская система записи цифр не похожа на нашу не только внешне, но и функционально. Например, каждая цифра имеет минимум два (или более) чтения для разных случаев употребления, а известные нам цифры разбиваются на непривычные составляющие. Эта лекция коротко рассказывает о происхождении и общем функционировании японских цифр.", "https://www.youtube.com/watch?v=lAlvjb5Gd-E"),
    new Lecture("Ульяна Громова", "15 минут про говорящих обезьян", "Обезьяны владеют речью, хотя не умеют произносить слова вслух. Я расскажу про эксперименты с гориллами, шимпанзе, бонобо и орангутанами, жестовый язык Амслен, лексиграммы Йеркиш, другие способы общения с приматами и то, чем отличается речь приматов от человеческой.","https://www.youtube.com/watch?v=0e9maNd9AdE"),
    new Lecture("Анна Дорошенко", "15 минут про графен", "Графен – самый тонкий материал, полученный учеными. Он обладает необычными свойствами и в перспективе может заменить собой кремниевую электронику. Я расскажу про свойства графена и про элементы электроники, которые уже сейчас созданы на его основе", "https://www.youtube.com/watch?v=diMFwhJld7w"),
    new Lecture("Борис Мороз", "15 минут о My little pony", "Чем считать сериал и культурный феномен My Little Pony — религией, общественным движением или троллингом? Я расскажу о том, как разноцветные лошади могут влиять на массовую культуру и вашу жизнь.", "https://www.youtube.com/watch?v=qyK68YjjRCA"),
    new Lecture("Александр Гапак", "15 минут о мировой истории", "Историю обычно изучают кусками: история той-то страны такого-то периода. Я хочу целостно рассказать про события последних 50 000 лет: расселение людей по планете, неолитическая революция, первые цивилизации, фасоль, античность, средневековье, новое время.", "https://www.youtube.com/watch?v=sgx_KauWoxQ"),
    new Lecture("Александр Семченков", "15 минут про трансгуманизм", "Трансгуманизм — это уверенность в технологическом бессмертии. Это подготовка к будущему, в котором мы победим смерть. Сегодня многие технологические дороги стекаются в одну широкую магистраль. Я расскажу о том, откуда эти дороги берут начало и куда нас ведет эта магистраль.", "https://www.youtube.com/watch?v=GYhNhRGhfm4"),
    new Lecture("Татьяна Бушенев", "15 минут про Большой адронный коллайдер", "Хотите узнать больше о самой огромной и сложной машине, построенной людьми? Я побывала на БАКе, привезла оттуда уникальные фото и интересные факты, и теперь хочу поделиться этим с вами. А еще я хочу рассказать, что хорошего и полезного Большой адронный коллайдер дал всем нам.", "https://www.youtube.com/watch?v=z3aV5TdYYb8"),
    new Lecture("Мария Кошевая", "15 минут про глютен", "Глютен — вредное вещество или пищевой миф? Для кого соблюдать \"глютен-фри\" диету — жизненная необходимость, а для кого — модная причуда? Я расскажу, в каких продуктах содержится глютен, стоит ли его избегать и какие мифы связаны с этим веществом.", "https://www.youtube.com/watch?v=8U8DpENsaaU"),
    new Lecture("Александр Гапак", "15 минут о еде", "Вредная еда убила больше людей, чем ДТП, ВИЧ, рак и вирусные заболевания вместе взятые. Я хочу поговорить о причинах неправильного питания современных людей. Изменив свой рацион, мы можем прожить на 30 лет дольше.", "https://www.youtube.com/watch?v=MfWA5yTB-o4"),
    new Lecture("Мирослава Мирошник", "15 минут про самооценку", "Что такое самооценка, для чего она, как формируется. И какая она должна быть, почему позитивные самоутверждения не работают, и как можно оптимизировать ее уровень. Почему важно признавать свои ошибки, и решится задавать вопросы.", "https://www.youtube.com/watch?v=6lxqIvq8PEY"),
    new Lecture("Иван Магда", "15 минут про биотехнологии", "Биотехнология — одна из молодых и развивающихся наук, и, несмотря на это, она достигла большого научного и прикладного прогресса. Это привело к формированию множества споров и вопросов, за и против. Доклад посвящён тому, чем биотехнологи занимаются в повседневной работе и как всё выглядит в действительности.", "https://www.youtube.com/watch?v=xlyajYDRU3Ahttps://www.youtube.com/watch?v=xlyajYDRU3A"),
    new Lecture("Мариам Найем", "15 минут о порнографии", "Я расскажу о порнографии как о культурном феномене. Как давно она уже есть? Меняет ли отношение к сексу? Позитивное или негативное воздействие оказывает на зрителя? Никакого ханжества не будет.", "https://www.youtube.com/watch?v=tMGfWBvAPS4"),
    new Lecture("Александра Бойко", "15 минут про ВИЧ-диссидентство", "Я расскажу о том, что же это за явление — ВИЧ-диссидентство, почему оно возникло и какие ужасные последствия за собой влечет. Также мы поговорим чуть-чуть о СПИДе, немного о толерантности и капельку об ненависти.", "https://www.youtube.com/watch?v=x1FLMxDcJto"),
    new Lecture("Лия Савельева", "15 минут про боль", "Я объясню механизм образования боли, почему она ощущается и зачем существует. Мы рассмотрим прохождение болевого сигнала от рецептора до мозга и компоненты боли. Что такое ноцицепция, чем она отличается от боли и в чем она является тем же самым?", "https://www.youtube.com/watch?v=0UQgyDAaols"),
    new Lecture("Юрий Гошовский", "15 минут про происхождение человека", "Я расскажу о последних двух миллионах лет — о запутанной истории становления рода Homo. Сколько существовало видов людей, где они были, сколько одновременно было разных видов, куда делись другие и зачем палеоантропологам сидеть на диете?", "https://www.youtube.com/watch?v=vh1h6dZmFc8"),
    new Lecture("Дима Веселов", "15 минут о когнитивной теории сознания", "Почему людям легко видеть вещи вокруг, а компьютерам очень сложно? Насколько наши решения — это действительно наши решения? Как работает наше сознание, как оно не работает и как именно это мешает нам жить?", "https://www.youtube.com/watch?v=7bwXv5n9SlUhttps://www.youtube.com/watch?v=7bwXv5n9SlU"),
    new Lecture("Таня Бушенева", "15 минут о критической массе", "Ядерные реакторы работают благодаря цепной реакции деления тяжелых ядер. Я расскажу, как получают критическую массу, как запускают цепную реакцию, как ей управляют и как управляли, когда только учились это делать.", "https://www.youtube.com/watch?v=PwL7bXn1YFw"),
    new Lecture("Александр Семченков", "15 минут про клеточные автоматы", "Что может быть живого на листе бумаги в клеточку? Хотите почувствовать себя творцом жизни? На лекции вы можете научиться играть в интереснейшую игру \"Жизнь\". Также вы узнаете о том, как сделать робота, который делает свои копии.", "https://www.youtube.com/watch?v=KFpID7ixaMY"),
    new Lecture("Мариам Найем", "15 минут про мультики Дисней", "Мы все любим Дисней. Мы все его пересматриваем, но есть детали, на которые не обращаем внимание. Лекция о том, какими были и какими стали представители королевских кровей. И, конечно же, немного о стереотипах.", "https://www.youtube.com/watch?v=lBxpaqELq_U"),
    new Lecture("Таня Бушенева", "15 минут про ловушки психики", "Наша психика иногда поступает с нами очень подло и совсем не способствует выживанию, успеху и счастью. Я расскажу о случаях, когда мозг работает против нас. Может, понимания, что мы иногда ведем себя не умнее, чем голуби, будет достаточно, чтобы выбраться из ловушки?", "https://www.youtube.com/watch?v=ery9r7BLdxg"),
    new Lecture("Дмитрий Шевченко", "15 минут про ошибки в лекциях", "Каждый, кто учится, рано или поздно сталкивается с необходимостью делиться знаниями. Я расскажу вам, чего НЕ стоит делать, если вы не хотите, чтобы ваша аудитория потеряла к вам интерес через несколько минут после начала лекции.", "https://www.youtube.com/watch?v=hRZE5DWgEJM"),
    new Lecture("Сергей Мовчан", "15 минут об эстетике Warhammer 40К", "Огромный Империум человечества, бюрократия, миллионы людских планет, окруженные ордами ксеносов, будто созданными для бойни, силы Хаоса, предатели и война... Я расскажу об эстетике мира, где нет ничего, кроме войны.", "https://www.youtube.com/watch?v=MoTZjm6P9IM"),
    new Lecture("Александра Бойко", "15 минут о вакцинации", "Я расскажу всем сомневающимся о том, почему делать прививки дешевле, чем лечиться у меня и не только у меня, как вакцинированные соседи защищают непривитого ребенка и о том, что пробу Манту мочить вполне можно.", "https://www.youtube.com/watch?v=RS3Kb5ucUvs"),
    new Lecture("Таня Бушенева", "15 минут о радиации", "Радиация всегда с нами, но мы не видим и не ощущаем ее в несмертельных дозах. Я хочу поговорить о том, как она устроена, что она с нами делает и как мы с ней все-таки уживаемся.", "https://www.youtube.com/watch?v=SG704p9JxZc"),
    new Lecture("Борис Мороз", "15 минут про зарождение хираганы", "Позаимствовав иероглифы у Китая, Япония едва не потеряла свою самобытность, растворившись в языке и культуре Поднебесной. Однако свой собственный алфавит смог не только зародиться, но и выжить в непростой борьбе. Решающую роль в этом сыграла судьба лишь одного человека.", "https://www.youtube.com/watch?v=NKRDz_CNG1s"),
    new Lecture("Евгений Звяги", "15 минут про микровол", "Микроволновое излучение зарекомендовало себя в быту, в промышленности и в науке. Я расскажу, почему нельзя класть ложку в воду в СВЧ-печи, почему в ней искрится фольга и как микроволны помогают в создании лекарств.", "https://www.youtube.com/watch?v=TXUBAHffKyo"),
    new Lecture("Александр Гапак", "15 минут про Искусственный Интеллект. Обсуждение.", "Что такое Искусственный Интеллект, каких он бывает видов, как устроен внутри? Будут ли у него чувства и эмоции, захватит ли он человечество или будет нам верным помощником? Узнай все об ИИ в этой лекции.", "https://www.youtube.com/watch?v=Pkx8xwcpG1U"),
    new Lecture("Максим Меркулов", "15 минут про нейромедиаторы", "Мозг имеет множество скрытых механизмов работы, многие из которых совершенно иначе мы видим изнутри. Я попробую рассказать о некоторых из них.", "https://www.youtube.com/watch?v=g3qRxZZc-C4"),
    new Lecture("Дарья Андреева", "15 минут о вакцинации", "О вакцинации сейчас ведется много споров, однако далеко не все, что говорят о прививках, имеет отношение к действительности. Я расскажу о том, как работают вакцины, о возможных рисках и о том, как наш выбор за или против вакцинации влияет на общество в целом.", "https://www.youtube.com/watch?v=ngpoOqUxW6w"),
    new Lecture("Дарья Бурцева", "15 минут про прионы", "Мы привыкли думать, что инфекционные болезни вызывают живые существа: бактерии, грибы, вирусы. Я хочу вам рассказать о прионах — инфекционных белках. Не являясь 'живыми' в привычном смысле слова, они не менее опасны и интересны для изучения", "https://www.youtube.com/watch?v=yiHcBdz1uPo"),
    new Lecture("Борис Тренин", "15 минут о виртуальной реальности", "Станут ли VR-технологии изобретением, сравнимым по значению с телевизором? С чего все началось и каким станет в будущем?", "На этой лекции можно будет не только услышать о виртуальной реальности, но и увидеть действующие экземпляры VR-очков", "https://www.youtube.com/watch?v=bSnEJnNkD30"),
    new Lecture("Евгений Киося", "15 минут про тихоходок", "Тихоходки — это очень-очень мелкие животные, замечательные своей устойчивостью практически ко всему на свете. Я расскажу, как проходит их жизнь, как им удается \"умирать и оживать\" в капле воды и на чем основана их сверхустойчивость.", "https://www.youtube.com/watch?v=qbyhivWtblo"),
    new Lecture("Дмитрий Веселов", "15 минут о крахе цивилизаций", "С какими проблемами сталкивались исчезнувшие цивилизации? Что мы о них узнали из новых археологических исследований? Может ли опыт древних людей помочь современному человеку и чем именно - об этом и еще о многом в лекции о коллапсе цивилизаций.", "https://www.youtube.com/watch?v=JRk4MKTPXRA"),
    new Lecture("Екатерина Лебедь", "15 минут про антиоксиданты", "В XVI веке Парацельс произнес тезис \"Все есть яд и все есть лекарство; тем или иным его делает только доза\". Мы поговорим о балансе между содержанием свободных радикалов и антиоксидантов в организме и последствиях его нарушения.", "https://www.youtube.com/watch?v=xwikcTK4d9A"),
    new Lecture("Ольга Соколова", "15 минут о депрессии", "Моя лекція - про опис захворювання депресії, симптоми та розповсюдженість. Хочу пояснити людям, що це серйозне захворювання, яке вимагає діагностики та лікування. А також те, що хворі потребують адекватного відношення. Коротко розкажу про лікування.", "https://www.youtube.com/watch?v=B3wIiRoq37U"),
    new Lecture("Максим Лойченко", "15 минут про CRISPR", "CRISPR — подающий надежды прорыв в генной инженерии. Он может стать как лекарством, так и источником проблем. Я расскажу, как лечить генетические заболевания, редактировать людей и уничтожать комаров с помощью бактериального иммунитета.","https://www.youtube.com/watch?v=W7m8_26RH_0"),
    new Lecture("Мариам Найем", "15 минут про Tinder-сюрприз", "Моя лекция — о приложении для знакомств Tinder и о причинах его популярности. Меняют или нет подобные вещи привычный нам тип общения? Кто не знаком с приложением, советую перед лекцией скачать его и поиграть немного.", "https://www.youtube.com/watch?v=-FvRsRu2X1M"),
    new Lecture("Ирина Яцюк", "15 минут про антибиотики", "Антибиотики спасли и спасают множество жизней. Однако болезнетворные микроорганизмы становятся устойчивыми к антибиотикам. Я расскажу, как эта устойчивость возникает и какие пути решения этой проблемы предлагает нам наука.", "https://www.youtube.com/watch?v=TR8S0st_HK4"),
    new Lecture("Таня Бушенева", "15 минут про атомные станции", "Сейчас (3 января 2016 года) в мире работают 442 атомных реактора. Атомные станции использует 31 страна, а вы, возможно, еще не знаете в подробностях, как они работают. Приходите, и я расскажу вам, как устроены 282 из них.", "https://www.youtube.com/watch?v=-_fGgMX1fdk"),
    new Lecture("Александр Семченков", "15 минут про 3D-печать", "3D-печать — аддитивный способ производства, быстро набирающий популярность. У нее большое будущее — освоение космоса, печать органов, новые свойства старых материалов. Способы печати очень разнообразны, мы попробуем в них разобраться.", "https://www.youtube.com/watch?v=KXoT_KfutnM"),
    new Lecture("команда 15x4 Харьков", "Открытие бранча во Львове", "Видео от команды 15x4 Харьков про открытие бранча во Львове. Мы хотим показать, чем является 15х4 вне ивентов и кто мы такие вне лекций.", "https://www.youtube.com/watch?v=7BcWBhKvVGc"),
    new Lecture("Глеб Сидора ", "15 минут о демагогии", "Я расскажу вам, как правильно вести дискуссию, каких ошибок избегать при построении аргументов и как понять, что вами пытаются манипулировать.", "https://www.youtube.com/watch?v=mkcduEZFJvI"),
    new Lecture("Святослав Денисенко", "15 минут о бессмертии", "Я расскажу, зачем нам нужно жить вечно, каким образом можно этого достичь, что уже сделано в этом направлении и что нам еще предстоит сделать.", "https://www.youtube.com/watch?v=R1dQ3xqoLM0https://www.youtube.com/watch?v=R1dQ3xqoLM0"),
    new Lecture("Влада Исакова", "15 минут о частях речи", "В школе каждому рассказывали про подлежащее и сказуемое, учили отличать причастие от деепричастия. Но как-то забыли объяснить, чем это поможет вам в жизни, если вы - не студент филфака. Я постараюсь исправить это досадное разумение и раскрою секрет гениальности Шекспира на десерт", "https://www.youtube.com/watch?v=30VgYpL8cRU"),
    new Lecture("Евгений Майковец", "15 минут про неочевидные изобретения", "Есть вещи настолько привычные, что мы пользуемся ими каждый день, даже не замечая. Моя лекция расскажет, откуда они взялись, кто их придумал и когда.", "https://www.youtube.com/watch?v=owHyjtVyyXA"),
    new Lecture("Иван Магда", "15 минут про научный метод", "С древних времен ученые стремились к систематизации проведения исследований для получения истинных научных знаний без домыслов и предубеждений. Это привело к созданию \"Научного метода\". О его развитии, основных принципах и сути вы узнаете в данной лекции", "https://www.youtube.com/watch?v=1jhUwBHAKCMhttps://www.youtube.com/watch?v=1jhUwBHAKCM")
];



LogPanel = {
	day: 0,
	messages: [],
	clear: function(){this.messages = []},
	hide: function(){
		$('#main_content').toggleClass('main_content80 main_content100');
	}
};

function LogMessage(filter, text) {
	this.filter = filter;
	this.text = text;
};

LogPanel.filters = ["Badge", "Not enough", "Paid", "Gained", "Reward"];

var check_html ="";
LogPanel.filters.forEach(function (filter) {
	check_html += '<input type="checkbox" name="log_filter" checked="checked" value="'+filter+'">'+filter;
});

document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("log_panel_filters").insertAdjacentHTML('beforeend', check_html);
});

function FilterLogs(){
	var check = document.getElementsByName("log_filter");
	check.forEach(function(item){
		if(item.checked==true){
			LogPanel.messages.forEach(function(logMessage){
				if(logMessage.text.includes(item.value)){
					logMessage.filter = true;
				}
			});
		}else{
			LogPanel.messages.forEach(function(logMessage){
				if(logMessage.text.includes(item.value)){
					logMessage.filter = false;
				}
			});
		}
	});
};
/**
 * Created by Стас on 09.08.2016.
 */
var showingTooltip;

document.onmouseover = function(e) {
    if (!showingTooltip) {
        var target = e.target;
        var tooltip = target.getAttribute('data-tooltip');
        if (!tooltip) return;
        var tooltipElem = document.createElement('div');
        tooltipElem.className = 'skills_tip';
        tooltipElem.innerHTML = "U will get " + Player.countQuantity(tooltip,target.innerText).toFixed(2) + " skill points";
        document.body.appendChild(tooltipElem);
        var coords = target.getBoundingClientRect();

        var left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
        if (left < 0) left = 0;

        var top = coords.top - tooltipElem.offsetHeight - 5;
        if (top < 0) {
            top = coords.top + target.offsetHeight + 5;
        }

        tooltipElem.style.left = left + 'px';
        tooltipElem.style.top = top + 'px';
        showingTooltip = tooltipElem;
    }
};

document.onmouseout = function(e) {
 if (showingTooltip) {
 document.body.removeChild(showingTooltip);
 showingTooltip = null;
 }
};

var Time = {
    ticks: 0,
    day: 0,
    ear: 0,
    season: 'winter'
};

var TimeReact = React.createClass({displayName: "TimeReact",
    getInitialState: function() {
        return {
            ticks: 0,
            day: 0,
            ear: 0,
            season: 'winter'
        };
    },

    tick: function () {

        var ticks = this.state.ticks + 1;
        this.setState({
            ticks: ticks,
            day:  ticks % 356,
            ear:  Math.floor(ticks / 356),
            season:  ['winter', 'spring', 'summer', 'autumn'][Math.floor((ticks % 356) / (356 / 4))],
        })

        message("A new day.");

        Player.tick();
        Gatherer.tick();
        Badge.tick();
        Civilization.tick();
        Dungeon.tick();
        Space.tick();
        Rally.tick();
        Castle.tick();
        Lecture.tick();
        Startup.tick();

        localStorage.setItem("Player", JSON.stringify(Player));
        localStorage.setItem("lectures.db", JSON.stringify(lectures.db));

        draw_all();
    },

    componentDidMount: function() {
        setInterval(this.tick, 1000, this); 
    },

    render: function() {
        Time.season = this.state.season;
        return (
            React.createElement("div", null, 
                React.createElement("span", null, " Ear: ", this.state.ear, " "), 
                React.createElement("span", null, " Day: ", this.state.day, " "), 
                React.createElement("span", null, " Season: ", this.state.season, " ")
            )
        );
    }
});

ReactDOM.render(
  React.createElement(TimeReact, null),
  document.getElementById('time_container')
);


window.onload = function() {
    draw_all();

    // will start ticking after mounting
    //var t = setInterval(Time.tick, 1000);
    Player.revealSecret('seek');
    Player.revealSecret('popularization');
    Player.revealSecret('communication');
    Player.revealSecret('attentiveness');
    //Player.revealSecret('motivation');
    events.db.push(Event.generator());

    var savedPlayer = JSON.parse(localStorage.getItem("Player"));
    if (savedPlayer) {
        console.log("savedPlayer" + savedPlayer);

        for (var i = 0; i < savedPlayer.volunteers_memory; i++) {
            Gatherer.found(1);
            Player.volunteers_memory++;
            Player.volunteers++;
        }
        Player.volunteers += savedPlayer.volunteers_memory - i;
        Player.volunteers_memory += savedPlayer.volunteers_memory - i;

        Player.race_win_points = savedPlayer.race_win_points;
        Player.race_win_points_memory = savedPlayer.race_win_points_memory;
    }

    var savedLectures = JSON.parse(localStorage.getItem("lectures.db"));
    if (savedLectures) {
        lectures.db = savedLectures;
    }
}