define([
    'underscore',
    'Magento_Ui/js/grid/columns/select'
], function (_, Column) {
    'use strict';

    return Column.extend({
        defaults: {
            bodyTmpl: 'Learning_StatusColor/ui/grid/cells/text'
        },
        getStatusColor: function (row) {            
            if (row.status == 'pending') {
                return 'grid-severity-pending';
            }else if(row.status == 'processing') {
                return 'grid-severity-processing';
            }else if(row.status == 'complete') {
                return 'grid-severity-complete';
            }else if(row.status == 'closed') {
                return 'grid-severity-closed';
            }
            return '#303030';
        }
    });
});


