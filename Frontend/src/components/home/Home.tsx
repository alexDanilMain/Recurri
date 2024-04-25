

function Home() {
  return (
    <div className="drawer lg:drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button lg:hidden h-8" >Open drawer</label>

          <div className="pl-4 text-sm breadcrumbs h-12">
            <ul>
              <li><a>Home</a></li>
              <li><a>Documents</a></li>
              <li>Add Document</li>
            </ul>
          </div>
          <CreateTemplate />

        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content ">
            {/* Sidebar content here */}
            <li><h1 className="text-2xl">Recurri</h1></li>
            <li><a>Create Template</a></li>
            <li><a>About Us</a></li>


          </ul>
        </div>
      </div>
  )
}

export default Home