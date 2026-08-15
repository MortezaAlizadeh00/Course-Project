// const $ = document;
// const addModalElem = $.querySelector("#add-new-course-modal");
// const showAddModalBtn = $.querySelector(".courses-btn-add-new-course");
// // let adminButtons = "";

// const showAddModel = () => addModalElem.classList.add("visible");
// const hideAddModel = () => addModalElem.classList.remove("visible");


// if (showAddModalBtn) {
//     showAddModalBtn.addEventListener("click", (e) => {
//         e.preventDefault();
//         showAddModel();
//     });
// }

// const searchInput = document.getElementById("search-input");

// const coursesList = document.getElementById("courses-list");

// function openEditModal(id, title, price, teacher) {
//     document.getElementById("course-id").value = id;
    
//     document.getElementById("course-title").value = title;
//     document.getElementById("course-price").value = price;
//     document.getElementById("course-teacher").value = teacher;

//      // تنظیم action فرم
//     document.querySelector(".edit-user-form").action = `/courses/edit/${id}`;
//     document.getElementById("edit-modal").classList.add("visible");

// }

// document.addEventListener("keydown", (event) => {

//     if (event.key === "Escape") {
//         document.querySelectorAll(".modal-container.visible")
//             .forEach(modal => modal.classList.remove("visible"));
//     }

// });


// searchInput.addEventListener("input", async () => {

//     const value = searchInput.value.trim();

//     const response = await fetch(`/courses/search?title=${value}`);

//     const courses = await response.json();

//     coursesList.innerHTML = "";

// courses.forEach(course => {

//     let buttons = "";

//     if (currentUser && currentUser.role === "ADMIN") {
//         buttons = `
//             <div class="courses-btns">
//                 <a href="#"
//                    class="courses-btn-edit btn"
//                    onclick="openEditModal('${course._id}','${course.title}','${course.price}','${course.teacherName}'); return false;">
//                     ویرایش
//                 </a>

//                 <a href="/courses/remove/${course._id}"
//                    class="courses-btn-delete btn">
//                     حذف
//                 </a>
//             </div>
//         `;
//     }else if (currentUser && currentUser.role === "USER") {

//     buttons = `
//         <div class="courses-btns">
//             <a href="/cart/add/${course._id}" class="btn">
//                 سفارش
//             </a>
//         </div>
//     `;

// }

//     coursesList.innerHTML += `
//         <li class="courses-item">
//             <div class="courses-img-title">
//             <img src="/uploads/${course.image}" class="courses-img">
//                 <div class="course-info">
//                     <h5 class="courses-name">نام دوره :  ${course.title}</h5>
            
//                     <h5 class="courses-name"> قیمت :  ${course.price}</h5>
            
//                     <h5 class="courses-name">نام مدرس  :  ${course.teacherName}</h5>
//                 </div>
//             </div>

//             ${buttons}
//         </li>
//     `;

// });

// });

const $ = document;
const addModalElem = $.querySelector("#add-new-course-modal");
const showAddModalBtn = $.querySelector(".courses-btn-add-new-course");

const showAddModel = () => addModalElem.classList.add("visible");
const hideAddModel = () => addModalElem.classList.remove("visible");

if (showAddModalBtn) {
    showAddModalBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showAddModel();
    });
}

const searchInput = document.getElementById("search-input");
const coursesList = document.getElementById("courses-list");

function openEditModal(id, title, price, teacher) {
    document.getElementById("course-id").value = id;
    document.getElementById("course-title").value = title;
    document.getElementById("course-price").value = price;
    document.getElementById("course-teacher").value = teacher;

    document.querySelector(".edit-user-form").action = `/courses/edit/${id}`;
    document.getElementById("edit-modal").classList.add("visible");
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        document.querySelectorAll(".modal-container.visible")
            .forEach(modal => modal.classList.remove("visible"));
    }
});

if (searchInput) {
    searchInput.addEventListener("input", async () => {

        const value = searchInput.value.trim();

        const response = await fetch(`/courses/search?title=${value}`);
        const courses = await response.json();

        coursesList.innerHTML = "";

        courses.forEach(course => {

            let buttons = "";

            if (currentUser && currentUser.role === "ADMIN") {

                buttons = `
                    <div class="courses-btns">
                        <a href="#"
                           class="courses-btn-edit btn"
                           onclick="openEditModal('${course._id}','${course.title}','${course.price}','${course.teacherName}'); return false;">
                            ویرایش
                        </a>

                        <a href="/courses/remove/${course._id}"
                           class="courses-btn-delete btn">
                            حذف
                        </a>
                    </div>
                `;

            } else if (currentUser && currentUser.role === "USER") {

                buttons = `
                    <div class="courses-btns">
                        <a href="/cart/add/${course._id}" class="btn">
                            سفارش
                        </a>
                    </div>
                `;
            }

            coursesList.innerHTML += `
                <li class="courses-item">

                    <div class="courses-img-title">

                        <img src="/uploads/${course.image}" class="courses-img">

                        <div class="course-info">

                            <h5 class="courses-name">
                                نام دوره : ${course.title}
                            </h5>

                            <h5 class="courses-name">
                                قیمت : ${course.price}
                            </h5>

                            <h5 class="courses-name">
                                نام مدرس : ${course.teacherName}
                            </h5>

                        </div>

                    </div>

                    ${buttons}

                </li>
            `;
        });
    });
}

