INERTIA JS
in this project, we used laravel + inertia js + react

HOW DOES VIEWS WORK?
views are returned by JS components.
routing uses client-side routing library. each visit doesnt do a full page reload -> done using <Link> anchor.
link visits uses XHR, and JS can even use router.visit()

HOW DOES THE RESPONSE WORK?
Inertia makes an XHR visit -> returns a JSON response with the JS page component name and data (props) -> Inertia swaps out prev page comp with the new page comp, updates browser's history state

PAGES
Create pages in react
-> components will receive data  as props
Inertia response is from a controller or route
-> return Inertia::render('js component path',['field'=>$data]);

Creating layouts
wrapper within a layout component
props will be as children component

Persistent layouts
implement layouts as children
problem -> instance will be destroyed and recreated between visits.
solution: use inertia anjay
Home.layout = page => <Layout children={page} title="Welcome">

we can even use complex layouts
Home.layout = page => (
    <SiteLayout title="Welcome">
        <NestedLayout children={page}>
    </SiteLayout>
)

Default layouts
when using persistent layouts, page layout in the resolve callback can be added
resolve: name=>{
    const pages = import.meta.glob('./Pages/**/*.jsx', {eager:true})
    let page = pages[`./Pages/${name}.jsx`]
    page.default.layout = page.default.layout || (page => <Layout children={page}/>)
    return page
},


RESPONSES
Inertia::render();

REDIRECTS
return to_route('users.index');

303 response
PUT, PATCH, DELETE after redirect, must use a 303 resp, or the request wont be treated as a GET

external redirect
return Inertia::location($url);

ROUTING
All app routes are server-side, no react-router is necessary.

Route::inertia('/about','About') when no controller needed

Generating URLs
-> pass url as route('routename', variable)

TITLE&META
<Head> component to edit the title and meta
shorthand for head
<Head title="overhere"/>

MANUAL VISITS
instead of creating links, we can use inertia visits using JS by router.visit()
or use router short hands request methods
router.get(), post, put, patch, delete, reload with their params as url, data, and options.

method ooption from router.visit(url{method: 'get put patch post delet'})

Data
put the sent data like
data:{
    field: 'value',
    ...
}

Below are the options values

custom headers value may be put in options

File uploads
change options to use forceFormData as true

Browser history
inertia automatically adds new entry to browser history, but its possible to replace the current history by replace:true

Client side visits
router.push and router.replace 

State preservation
page visits create a new instance, losing all local state.
by default, post, put, patch, delete, and reload has preserveState true by default

if we want to preserve errors only, set the preserveState to errors

preserveScroll tau lah



FORMS
useForm hook -> hayo gmn
inertia has a form helper

can use
submit(method, url, options)
get(url, options)
post(url, options)
put(url, options)
patch(url, options)
destroy(url, options)

FILE UPLOADS
requests are made into FormData object.

VALIDATION


SHARED DATA
-> Flash messages