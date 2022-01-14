export function BarSection(props) {
    return (
        <section className="bar-section">
            <div className="bar-container">
                {/* <!-- filter bar --> */}
                <div id="myBtnContainer" className="filter-container">
                    <button id="ShowAll" className={'btn filter-btn'} onClick={props.handleFilter}>
                        Show all
                    </button>
                    <button id="Health" className={'btn filter-btn'} onClick={props.handleFilter}>
                        Health
                    </button>
                    <button id="Career" className={'btn filter-btn'} onClick={props.handleFilter}>
                        Career
                    </button>
                    <button id="Hobby" className={'btn filter-btn'} onClick={props.handleFilter}>
                        Hobby
                    </button>
                    <button id="School" className={'btn filter-btn'} onClick={props.handleFilter}>
                        School
                    </button>
                </div>
                {/* <!-- Search  --> */}
                <div className="d-flex justify-content-end searchbar">
                    <form className="form-inline">
                        <input
                            className="form-control mr-sm-2"
                            type="search"
                            placeholder="Type here.."
                            aria-label="Search"
                            onChange={props.handleSearch}
                        />
                    </form>
                </div>
            </div>
        </section>
    );
}
