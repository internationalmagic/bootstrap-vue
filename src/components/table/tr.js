import Vue from '../../utils/vue'
import bindAttrsMixin from '../../mixins/bind-attrs'
import normalizeSlotMixin from '../../mixins/normalize-slot'

export const props = {
  variant: {
    type: String,
    default: null
  }
}

const LIGHT = 'light'
const DARK = 'dark'

// @vue/component
export const BTr = /*#__PURE__*/ Vue.extend({
  name: 'BTr',
  mixins: [bindAttrsMixin, normalizeSlotMixin],
  inheritAttrs: false,
  provide() {
    return {
      bvTableTr: this
    }
  },
  inject: {
    bvTableRowGroup: {
      /* istanbul ignore next */
      default() /* istanbul ignore next */ {
        return {}
      }
    }
  },
  props,
  computed: {
    inTbody() {
      // Sniffed by <b-td> / <b-th>
      return this.bvTableRowGroup.isTbody
    },
    inThead() {
      // Sniffed by <b-td> / <b-th>
      return this.bvTableRowGroup.isThead
    },
    inTfoot() {
      // Sniffed by <b-td> / <b-th>
      return this.bvTableRowGroup.isTfoot
    },
    isDark() {
      // Sniffed by <b-td> / <b-th>
      return this.bvTableRowGroup.isDark
    },
    isStacked() {
      // Sniffed by <b-td> / <b-th>
      return this.bvTableRowGroup.isStacked
    },
    isResponsive() {
      // Sniffed by <b-td> / <b-th>
      return this.bvTableRowGroup.isResponsive
    },
    isStickyHeader() {
      // Sniffed by <b-td> / <b-th>
      // Sticky headers are only supported in thead
      return this.bvTableRowGroup.isStickyHeader
    },
    hasStickyHeader() {
      // Sniffed by <b-tr> / <b-td> / <b-th>
      // Needed to handle header background classes, due to lack of
      // background color inheritance with Bootstrap v4 table CSS
      return !this.isStacked && this.bvTableRowGroup.hasStickyHeader
    },
    tableVariant() {
      // Sniffed by <b-td> / <b-th>
      return this.bvTableRowGroup.tableVariant
    },
    headVariant() {
      // Sniffed by <b-td> / <b-th>
      return this.inThead ? this.bvTableRowGroup.headVariant : null
    },
    footVariant() {
      // Sniffed by <b-td> / <b-th>
      return this.inTfoot ? this.bvTableRowGroup.footVariant : null
    },
    isRowDark() {
      return this.headVariant === LIGHT || this.footVariant === LIGHT
        ? /* istanbul ignore next */ false
        : this.headVariant === DARK || this.footVariant === DARK
          ? /* istanbul ignore next */ true
          : this.isDark
    },
    trClasses() {
      return [this.variant ? `${this.isRowDark ? 'bg' : 'table'}-${this.variant}` : null]
    },
    trAttrs() {
      return { role: 'row', ...this.attrs$ }
    }
  },
  render(h) {
    return h(
      'tr',
      {
        class: this.trClasses,
        attrs: this.trAttrs,
        // Pass native listeners to child
        on: this.listeners$
      },
      this.normalizeSlot('default')
    )
  }
})
