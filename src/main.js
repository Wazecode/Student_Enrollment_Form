const JPDB_BASE_URL = "http://api.login2explore.com:5577";
const JPDB_IRL = "/api/irl";
const JPDB_IML = "/api/iml";
const DB_NAME = "schoolDB";
const REL_NAME = "studentTable";
const CONNECTION_TOKEN = "90931547|-31949330583000260|90959931";

function saveRoll2LS(jsonObj) {
    let data = JSON.parse(jsonObj.data);
    localStorage.setItem("id", data.rec_no);
}

function getStudentIdAsJsonObj() {
    var rollVar = $("#roll").val();
    var jsonStr = {
        rollNo: rollVar
    };
    return JSON.stringify(jsonStr);
}

function validateAndGetFormData() {
    var rollVar = $("#roll").val();
    if (rollVar === "") {
        alert("Roll number Required Value");
        $("#roll").focus();
        return "";
    }
    var fullNameVar = $("#fullName").val();
    if (fullNameVar === "") {
        alert("Employee Name is Required Value");
        $("#fullName").focus();
        return "";
    }
    var classVar = $("#class").val();
    if (classVar === "") {
        alert("Employee Email is Required Value");
        $("#class").focus();
        return "";
    }
    var birthDateVar = $("#birthDate").val();
    if (birthDateVar === "") {
        alert("Employee Email is Required Value");
        $("#birthDate").focus();
        return "";
    }
    var addressVar = $("#address").val();
    if (addressVar === "") {
        alert("Employee Email is Required Value");
        $("#address").focus();
        return "";
    }
    var enrollmentDateVar = $("#enrollmentDate").val();
    if (enrollmentDateVar === "") {
        alert("Employee Email is Required Value");
        $("#enrollmentDate").focus();
        return "";
    }
    var jsonStrObj = {
        rollNo: rollVar,
        fullName: fullNameVar,
        class: classVar,
        birthDate: birthDateVar,
        address: addressVar,
        enrollmentDate: enrollmentDateVar
    };
    return JSON.stringify(jsonStrObj);
}

function resetForm() {
    $("#roll").val("");
    $("#fullName").val("");
    $("#class").val("");
    $("#birthDate").val("");
    $("#address").val("");
    $("#enrollmentDate").val("");
    $("#roll").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#roll").focus();
}

function fillData(jsonObj) {
    saveRoll2LS(jsonObj);
    let data = JSON.parse(jsonObj.data).record;
    console.log(jsonObj);
    $("#roll").val(data.rollNo);
    $("#fullName").val(data.fullName);
    $("#class").val(data.class);
    $("#birthDate").val(data.birthDate);
    $("#address").val(data.address);
    $("#enrollmentDate").val(data.enrollmentDate);
}

function getStudents() {
    let studentObj = getStudentIdAsJsonObj();
    let getRequest = createGET_BY_KEYRequest(CONNECTION_TOKEN, DB_NAME, REL_NAME, studentObj);
    jQuery.ajaxSetup({async: false});
    let resultObj = executeCommandAtGivenBaseUrl(getRequest,
            JPDB_BASE_URL, JPDB_IRL);
    jQuery.ajaxSetup({async: true});

    if (resultObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);

    } else if (resultObj.status === 200) {
        $("#roll").prop("disabled", false);
        fillData(resultObj);
        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", false);
    }
    $("#fullName").focus();
}

function saveStudent() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest(CONNECTION_TOKEN,
            jsonStr, DB_NAME, REL_NAME);
    alert(putReqStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr,
            JPDB_BASE_URL, JPDB_IML);
    jQuery.ajaxSetup({async: true});
    alert(JSON.stringify(resultObj));
    resetForm();
}

function changeData() {
    $('change').prop('disabled', true);
    let jsonChg = validateAndGetFormData();
    let updateRequest = createUPDATERecordRequest(CONNECTION_TOKEN, jsonChg, DB_NAME, REL_NAME, localStorage.getItem("id"));
    alert(updateRequest);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(updateRequest,
            JPDB_BASE_URL, JPDB_IML);
    jQuery.ajaxSetup({async: true});
    console.log(resultObj);
    resetForm();
}

