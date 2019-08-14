# Magento 2 How to change order status text color in admin UI Component grid.

In this module we diffrentiate order status in admin **sales order grid** by applying color. Follow below step to apply text color to admin sales order UI component grid.


## To create a module, you need to follow below step.

- Step 1: Create the module folder.
- Step 2: Declare module using module.xml
- Step 3: Create registration.php file for register module.
- Step 4: Override `sales_order_grid`.
- Step 5: Create JS component named `select.js` file like below.
- Step 6: Create HTML template for JS component.
- Step 7: Create CSS file.
- Step 8: Override `sales_order_index.xml`.


### Step 1. Create the module folder.

There are two possible locations for modules in Magento 2
- app/code/
- vendor/
The location of module can be describe based on how module has been installed. so here is a question Which of these locations should you choose for your new module?

If you build a module for a specific project to enhance or change functionality, it is best to choose the app/code folder.
If you build an extension, it is better to use composer to create it, and put your module in the vendor/<YOUR_VENDOR>/module-something folder.

So here we will use `Learning` for Vendor name and `HelloMage` for ModuleName. So we need to make this folder:
`app/code/Learning/StatusColor`

### Step 2. Create the etc/module.xml file for declare module.

Create `module.xml` file under `app/code/Learning/StatusColor/etc`.

~~~
app/code/Learning/StatusColor/etc/module.xml
~~~

And the content for this file:

~~~ xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:Module/etc/module.xsd">
     <module name="Learning_HelloMage" setup_version="1.0.0" />
</config>
~~~


### Step 3. Create registration.php file for register module.

Create `registration.php` file under `app/code/Learning/StatusColor` Add below content to `registration.php` file.

~~~
app/code/Learning/StatusColor/registration.php
~~~

And it’s content for our module is:

~~~
\Magento\Framework\Component\ComponentRegistrar::register(
    \Magento\Framework\Component\ComponentRegistrar::MODULE,
    'Learning_HelloMage',
    __DIR__
);
~~~

### Step 4. Override `sales_order_grid`.

Here we override `sales_order_grid.xml` to change order status color, and code look like this.

~~~
<?xml version="1.0" encoding="UTF-8"?>
<listing xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_Ui:etc/ui_configuration.xsd">
    <columns name="sales_order_columns">
        <column name="status" component="Learning_StatusColor/js/grid/columns/select">
            <settings>
                <filter>select</filter>
                <options class="Magento\Sales\Ui\Component\Listing\Column\Status\Options"/>
                <dataType>select</dataType>
                <label translate="true">Status</label>
            </settings>
        </column>
    </columns>
</listing>
~~~

In above code we need to add code for only status column because we have to change only this column. now you need to add JS component to this column using component argument `<column name="status" component="Learning_StatusColor/js/grid/columns/select">` using this component we can change order status.

### Step 5. Create JS component named `select.js` file like below.

~~~
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
~~~

Using this js component we extend the actual magento JS component. and create function named `getStatusColor()`  then add condition for diffrent order status in this condition we return CSS class. And create template file to call this JS component function.

### Step 6. Create HTML template for JS component.

And your template look like this.

~~~
<div class="data-grid-cell-content" data-bind="attr: { class: $col.getStatusColor($row())}" text="$col.getLabel($row())"/>
~~~


### Step 7. Create CSS file.

Now we create CSS file to add CSS for given above class. and your css look like below.

~~~ php
.grid-severity-pending {
    background: #FFB347 none repeat scroll 0 0;
    border: 1px solid #eb5202;
    color: #eb5202;
    display: block;
    font-weight: bold;
    line-height: 17px;
    padding: 0 3px;
    text-align: center;
    text-transform: uppercase;
}
.grid-severity-processing {
    background: #E5F7FE none repeat scroll 0 0;
    border: 1px solid #006bb4;
    color: #006bb4;
    display: block;
    font-weight: bold;
    line-height: 17px;
    padding: 0 3px;
    text-align: center;
    text-transform: uppercase;
}
.grid-severity-complete {
    background: #d0e5a9 none repeat scroll 0 0;
    border: 1px solid #5b8116;
    color: #185b00;
    display: block;
    font-weight: bold;
    line-height: 17px;
    padding: 0 3px;
    text-align: center;
    text-transform: uppercase;
}
.grid-severity-closed {
    background: #f9d4d4 none repeat scroll 0 0;
    border: 1px solid #e22626;
    color: #e22626;
    display: block;
    font-weight: bold;
    line-height: 17px;
    padding: 0 3px;
    text-align: center;
    text-transform: uppercase;
}
~~~

### Step 8. Override `sales_order_index.xml`.

Now to define sales grid and include css we override `sales_order_index.xml` and file look like this.

~~~
<?xml version="1.0"?>
<page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
    <update handle="styles"/>
    <head>
        <css src="Learning_StatusColor::css/status-color.css" />
    </head>
    <body>
        <referenceContainer name="content">
            <uiComponent name="sales_order_grid"/>
        </referenceContainer>
    </body>
</page>
~~~

Now run below command.

~~~
Module status  : php bin/magento setup:upgrade
~~~

~~~
Enable module  : PHP bin/magento S:d:c
~~~

~~~
Disable module : PHP bin/magento static:content:deploy -f
~~~

### Result :

![Order Status color](https://i.imgur.com/DvquDAD.png)
