define(function () {
    'use strict';
    /**
     * @class
     * Base class for all EditActions.<br>
     * EditActions encapsulate {@link Autodesk.Viewing.Extensions.Markups.Core.Markup  Markup}
     * operations (such as creation, edition and deletion) that hook into the undo/redo system.
     *
     * The minimum set of methods to implement on an EditAction extension are:
     * - execute()
     * - undo()
     * - redo()
     *
     * A good set of classes to check their implementation are:
     * - [CreateCircle]{@link Autodesk.Viewing.Extensions.Markups.Core.CreateCircle}.
     * - [DeleteCircle]{@link Autodesk.Viewing.Extensions.Markups.Core.DeleteCircle}.
     * - [SetCircle]{@link Autodesk.Viewing.Extensions.Markups.Core.SetCircle}.
     *
     * @tutorial feature_markup
     * @constructor
     * @memberof Autodesk.Viewing.Extensions.Markups.Core
     *
     * @param {Autodesk.Viewing.Extensions.Markups.Core.MarkupsCore} editor
     * @param {String} type - An identifier for the EditAction.
     * @param {number} targetId - The id of the markup being affected.
     */
    function EditAction(editor, type, targetId) {

        this.type = type;
        this.editor = editor;
        this.targetId = targetId;
        this.addToHistory = true;
        this.selectOnExecution = true;
    }

    EditAction = EditAction;

    /**
     * Performs the action.
     */
    EditAction.prototype.execute = function () {

        this.editor.actionManager.execute(this);
    };

    /**
     * @abstract
     */
    EditAction.prototype.redo = function () {

    };

    /**
     * @abstract
     */
    EditAction.prototype.undo = function () {

    };

    /**
     * Provides a mechanism to merge consecutive actions of the same type.
     * @param {EditAction} action - Action to check if it can be merged with 'this'.
     * @returns {boolean} Returns true if merge has been applied. Parameter will be discarded.
     */
    EditAction.prototype.merge = function (action) {

        return false;
    };

    /**
     * Provides a mechanism to check whether the action yields no results.
     * @returns {boolean} Returns true if no changes happen with this action.
     */
    EditAction.prototype.isIdentity = function () {

        return false;
    };

    return EditAction;
});