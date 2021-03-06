import axios from 'axios';

import Constants from '../constants/constants';

const base = 'http://app.viomedia.com/courses/api';

/* eslint-disable no-console */

class CourseActions {

    static loadCourses(courses) {
        return {
            type: Constants.LOAD_COURSES,
            courses: courses
        };
    }

    static resetAddCourse() {        
        return {
            type: Constants.RESET_ADD_COURSE
        };
    }

    static deleteCourse(course) {
        return {
            type: Constants.DELETE_COURSE,
            course: course
        };
    }

    static updateCourseValue(value, index) {
        return {
            type: Constants.UPDATE_COURSE_VALUE,
            value: value,
            index: index
        };
    }

    static updateCourseContainer(currentCourse) {
        return {
            type: Constants.UPDATE_COURSE_CONTAINER,
            currentCourse: currentCourse
        };
    }

    static loadAuthors(authors) {
        return {
            type: Constants.LOAD_AUTHORS,
            authors: authors
        };
    }

    static sortCoursesInClient(sortColumn, sortOrder){        
        return {
            type: Constants.SORT_COURSES_CLIENT,
            sortColumn: sortColumn,
            sortOrder: sortOrder
        };
    }

    // =============================================== //
    // =============== ASYNC CALLS =================== //
    // =============================================== //
 
    static loadCoursesAsync() {

        return function (dispatch) {            
            axios.get(base + '/courses')
                .then(function (response) {
                    dispatch(CourseActions.loadCourses(response.data));
                })
                .catch(function (response) {
                    console.log('Error in loadCoursesAsync ' + response);
                });
        };
    }

    static sortCoursesInServerAsync(data) {
        
        return function (dispatch) {            
            axios.get(base + '/courses')
                .then(function (response) {                
                    response.data.forEach((v, i)=>{
                        response.data[i].title = v.title + " Some Extra text";
                    });
                    dispatch(CourseActions.loadCourses(response.data));
                })
                .catch(function (response) {
                    console.log('Error in loadCoursesAsync ' + response);
                });
        };
    }    

    static addCourseAsync(course) {

        return function (dispatch) {

            axios.post(base + '/courses', course)
                .then(function () {
                    dispatch(CourseActions.loadCoursesAsync());
                })
                .catch(function (response) {
                    console.log('Error in addCourse ' + response);
                });
        };
    }

    static updateCourseAsync(course) {

        return function (dispatch) {
            axios.put(base + `/courses/${course.Id}`, course)
                .then(function () {
                    dispatch(CourseActions.loadCoursesAsync());
                })
                .catch(function (response) {
                    console.log('Error in addCourse ' + response);
                });
        };
    }    

    static deleteCourseAsync(courseId) {

        return function (dispatch) {

            axios.delete(base + `/courses/${courseId}`)
                .then(function (response) {
                    dispatch(CourseActions.deleteCourse(response.data));
                })
                .catch(function (response) {
                    console.log('Error in deleteCourseAsync ' + response);
                });
        };
    }

    static loadAuthorsAsync() {

        return function (dispatch) {            
            axios.get(base + '/authors')
                .then(function (response) {                    
                    dispatch(CourseActions.loadAuthors(response.data));
                })
                .catch(function (response) {
                    console.log('Error in loadAuthorsAsync ' + response);
                });
        };
    }
}

export default CourseActions;