/*
 * Copyright (c) 2018. Igor Khorev
 * e-mail: igorhorev@gmail.com
 * telegram: https://t.me/IgorHorev
 * skype: igor.horev
 */

"use strict";

/**
 * Angular
 */

require("angular");
require("angular-resource");
require("angular-route");
require("angular-cookies");
require("ngstorage");
require("angular-sanitize");
//require("angular-i18n/angular-locale_ru-ru");

//*********************************
/**
 * angular-animate
 */
require("angular-animate");

/**
 * angular-aria
 */
require("angular-aria");

/**
 * angular-messages
 */
require("angular-messages");

/**
 * angular-strap
 */
//require("angular-strap");

/**
 * moment
 */
require("moment");

/**
 * moment-timezone
 */
//require("moment-timezone");

/**
 * angular-moment
 */
//require("angular-moment");


//********************************************

/**
 *  Angular Material
 */
require("angular-material");
require("angular-material/angular-material.css");

/**
 * Angular Material Icons
 */
require("angular-material-icons");

/**
 * JQuery
 */
require("jquery");

/**
 * Underscore
 */
require("underscore");

/**
 * Angular + Underscore
 */
//require("angular-underscore");

/**
 * FileSaver
 */
require("file-saver");


/**
 * D3
 */

//require("d3");



/**
 * Applications CSS
 */
require("css/base.css");
require("css/shadows.css");
require("css/xgantt.css");
require("css/rb.css");
require("css/rb_md.css");

require("css/designer.css");

require("css/fonts.css");

/**
 * Application
 */
require("js/app");
require("js/services");

/**
 * Red Button core
 */
require("js/rb/core/rbLoader");
require("js/rb/core/rbModelLoader");

require("js/rb/core/rbCore");

/**
 * Red Button components
 */
require("js/rb/core/components/rbModule");

require("js/rb/core/components/rbCoreModule");
require("js/rb/core/components/rbCommonModule");
require("js/rb/core/components/rbFileSelectorModule");
require("js/rb/core/components/rbListValuesModule");
require("js/rb/core/components/rbPanelHeaderDirective");
require("js/rb/core/components/controls/search/rbSearchModule");
require("js/rb/core/components/rbSequencerModule");
require("js/rb/core/components/controls/snacks/rbSnacksModule");

require("js/rb/core/components/controls/rbEditorModalController");
require("js/rb/core/components/controls/rbVisibleDirective");
require("js/rb/core/components/controls/rbVisibleDirective");

require("js/rb/core/components/controls/table/rbTableModule");
require("js/rb/core/components/controls/table/rbTableButtonsModule");
require("js/rb/core/components/controls/table/rbTableToolbarModule");
require("js/rb/core/components/controls/table/rbTableHeaderDirective");
require("js/rb/core/components/controls/table/rbTableFilterModule");
require("js/rb/core/components/controls/table/rbTableRowsDirective");
require("js/rb/core/components/controls/table/rbTableCellsDirective");
require("js/rb/core/components/controls/table/rbTableToolsModule");
require("js/rb/core/components/controls/pagination/rbPaginationDirective");
require("js/rb/core/components/controls/table/rbTablePagerModule");

require("js/rb/core/components/controls/treetable/rbTreeTablerController");
require("js/rb/core/components/controls/treetable/rbTreeTableDirective");
require("js/rb/core/components/controls/treetable/rbTreeTableHeaderDirective");
require("js/rb/core/components/controls/treetable/rbTreeTableContentDirective");
require("js/rb/core/components/controls/treetable/rbTreeTableRowDirective");
require("js/rb/core/components/controls/treetable/rbTreeTableCellDirective");

require("js/rb/core/components/controls/combobox/rbComboBoxArrayDirective");
require("js/rb/core/components/controls/combobox/rbComboBoxColumnDirective");
require("js/rb/core/components/controls/combobox/rbComboBoxColumnFilterDirective");
require("js/rb/core/components/controls/combobox/rbComboBoxDataController");
require("js/rb/core/components/controls/combobox/rbComboBoxDataDirective");
require("js/rb/core/components/controls/combobox/rbComboBoxDirective");


require("js/rb/core/components/controls/gadget/rbIconColorDirective");

require("js/rb/core/components/controls/search/rbSearchHelpDirective");


require("js/rb/core/components/data/rbDataModule");


/**
 * Red Button modules
 */

require("js/rb/core/rbSiteMap");
require("js/rb/core/rbSiteMapForm");
require("js/rb/core/rbSiteMapSection");

require("js/rb/core/rbBinding");
require("js/rb/core/rbBindingItem");
require("js/rb/core/rbColumn");
require("js/rb/core/rbColumnFilter");
require("js/rb/core/rbColumnOrder");
require("js/rb/core/rbDatabaseMetaData");
require("js/rb/core/rbDataMap");
require("js/rb/core/rbDataSource");
require("js/rb/core/rbDataSourceEvent");

require("js/rb/core/rbHierarchyConnection");
require("js/rb/core/rbHierarchyItem");
require("js/rb/core/rbHierarchyModel");
require("js/rb/core/rbModel");
require("js/rb/core/rbRowFilter");
require("js/rb/core/rbRowOrder");

require("js/rb/core/rbRowValidatorProcessor");
require("js/rb/core/rbRowValidator");

require("js/rb/core/rbSequence");
require("js/rb/core/rbTransaction");

/**
 * UI
 */
require("js/rb/ui/rbDisplayGadget");
require("js/rb/ui/xgantt");
require("js/rb/ui/xtree");

require("js/rb/ui/rbComboBox");
require("js/rb/ui/rbList");

require("js/rb/ui/rbListValues");

require("js/rb/ui/rbSideBar");

/**
 * VIEW
 */
require("js/rb/core/rbView");
require("js/rb/core/rbViewMenu");
require("js/rb/core/rbViewForms");


require("js/rb/core/rbApplication");
require("js/rb/core/rbForm");
require("js/rb/core/rbFormLayout");

require("js/rb/core/components/utils/rbElementsPositionManager");

/**
 * MODEL BUILDER
 */
require("js/rb/core/rbBuilderInfo");

require("js/rb/designer/rbModelBuilder");
require("js/rb/designer/rbModelBuilderDatabase");
require("js/rb/designer/rbModelBuilderModel");
require("js/rb/designer/rbModelBuilderDataRelation");
require("js/rb/designer/rbModelBuilderTable");

require("js/rb/designer/rbModelBuilderView");

/**
 * MODEL BUILDER UI
 * ANGULAR MODULES
 */
require("js/rb/designer/components/rbDesignerModule");


require("js/rb/designer/components/rbDesignerPropertiesEditorController");
require("js/rb/designer/components/rbDesignerPropertiesEditorDirective");
require("js/rb/designer/components/rbDesignerPropertiesListEditorDirective");

require("js/rb/designer/components/rbDesignerPropertyEditorDirective");

require("js/rb/designer/components/rbDesignerPropertyValuesListDirective");
require("js/rb/designer/components/rbDesignerFormLayoutEditorDirective");


require("js/rb/designer/components/rbDesignerMetaComponentController");
require("js/rb/designer/components/rbDesignerMetaComponentDirective");

require("js/rb/designer/components/rbDesignerPanelDirective");


require("js/rb/designer/components/rbDesignerDataSourcesDirective");

require("js/rb/designer/components/rbDesignerDataRelationDirective");
require("js/rb/designer/components/rbDesignerDataRelationMenuDirective");



require("js/rb/designer/components/rbDesignerObjectsCollectionEditorDirective");
