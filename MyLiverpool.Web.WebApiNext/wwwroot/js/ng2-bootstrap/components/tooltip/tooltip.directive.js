"use strict";
var core_1 = require('@angular/core');
var tooltip_container_component_1 = require('./tooltip-container.component');
var tooltip_options_class_1 = require('./tooltip-options.class');
var components_helper_service_1 = require('../utils/components-helper.service');
/* tslint:disable */
/* tslint:enable */
var TooltipDirective = (function () {
    function TooltipDirective(viewContainerRef, componentsHelper) {
        this.placement = 'top';
        this.enable = true;
        this.animation = true;
        /* tslint:enable */
        this.tooltipStateChanged = new core_1.EventEmitter();
        this.visible = false;
        this.viewContainerRef = viewContainerRef;
        this.componentsHelper = componentsHelper;
    }
    // todo: filter triggers
    // params: event, target
    TooltipDirective.prototype.show = function () {
        if (this.visible || !this.enable) {
            return;
        }
        this.visible = true;
        var options = new tooltip_options_class_1.TooltipOptions({
            content: this.content,
            htmlContent: this.htmlContent,
            placement: this.placement,
            animation: this.animation,
            hostEl: this.viewContainerRef.element,
            popupClass: this.popupClass,
            context: this.tooltipContext
        });
        var binding = core_1.ReflectiveInjector.resolve([
            { provide: tooltip_options_class_1.TooltipOptions, useValue: options }
        ]);
        this.tooltip = this.componentsHelper
            .appendNextToLocation(tooltip_container_component_1.TooltipContainerComponent, this.viewContainerRef, binding);
        this.triggerStateChanged();
    };
    // params event, target
    TooltipDirective.prototype.hide = function () {
        if (!this.visible) {
            return;
        }
        this.visible = false;
        this.tooltip.destroy();
        this.triggerStateChanged();
    };
    TooltipDirective.prototype.triggerStateChanged = function () {
        this.tooltipStateChanged.emit(this.visible);
    };
    TooltipDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[tooltip], [tooltipHtml]',
                    exportAs: 'bs-tooltip'
                },] },
    ];
    /** @nocollapse */
    TooltipDirective.ctorParameters = [
        { type: core_1.ViewContainerRef, },
        { type: components_helper_service_1.ComponentsHelper, },
    ];
    TooltipDirective.propDecorators = {
        'content': [{ type: core_1.Input, args: ['tooltip',] },],
        'htmlContent': [{ type: core_1.Input, args: ['tooltipHtml',] },],
        'placement': [{ type: core_1.Input, args: ['tooltipPlacement',] },],
        'isOpen': [{ type: core_1.Input, args: ['tooltipIsOpen',] },],
        'enable': [{ type: core_1.Input, args: ['tooltipEnable',] },],
        'animation': [{ type: core_1.Input, args: ['tooltipAnimation',] },],
        'appendToBody': [{ type: core_1.Input, args: ['tooltipAppendToBody',] },],
        'popupClass': [{ type: core_1.Input, args: ['tooltipClass',] },],
        'tooltipContext': [{ type: core_1.Input, args: ['tooltipContext',] },],
        'tooltipStateChanged': [{ type: core_1.Output },],
        'show': [{ type: core_1.HostListener, args: ['focusin',] }, { type: core_1.HostListener, args: ['mouseenter',] },],
        'hide': [{ type: core_1.HostListener, args: ['focusout',] }, { type: core_1.HostListener, args: ['mouseleave',] },],
    };
    return TooltipDirective;
}());
exports.TooltipDirective = TooltipDirective;