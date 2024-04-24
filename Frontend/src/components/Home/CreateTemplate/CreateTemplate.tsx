import WeekTable from "./WeekTable/WeekTable"

function CreateTemplate() {
    return (
        <section className="px-4">
            <form action="">
                <input type="button" name="addWeek" />
                <label htmlFor="addWeek" className="btn btn-sm">+ Add Week</label>
                <WeekTable />
            </form>

          
        </section>
    )
}

export default CreateTemplate