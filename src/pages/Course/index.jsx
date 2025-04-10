import { useEffect, useState } from "react";
import CourseTable from "../../CourseTable";
import { Button, Modal,Form, Input, Row, Col, InputNumber, Select, Space, DatePicker, Table, message, Alert } from 'antd';
import apiService from "../../services/apiService";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const instructorColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    }
];

const Course = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const [data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingCourse, setEditingCourse] = useState();
    const [isSaving, setIsSaving] = useState(false);
    const [isTableDataLoading, setIsTableDataLoading] = useState(true);
    const [instructorData, setInstructorData] = useState([]);
    const [selectedDate, setSelectedDate] = useState();

    const [isLectureDataLoading, setIsLectureDataLoading] = useState(false);

    const [dateSelected, setDateSelected] = useState(false);
    const [courseId, setCourseId] = useState();

    const fetchData = async () => {
        try {
            const response = await apiService.search('course', {});  // Passing empty query to fetch all data
            if(response) {
                setData(response);
                setIsTableDataLoading(false)
            }
        } catch (error) {
            console.log("Failed to fetch data: ", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const [form] = Form.useForm();

    const [modalOpen, setModalOpen] = useState(false);
    const [assignModalOpen, setAssignModalOpen] = useState(false);

    const [selectedInstructor, setSelectedInstructor] = useState([]);

    const saveButtonClicked = (e) => {
        form.validateFields().then(async () => {
            setIsSaving(true)
            const dataToBeAdded = form.getFieldsValue()

            const response = await apiService.insert('course', dataToBeAdded);

            if(response.data){
                setData([...data, response.data])
            
                messageApi.open({
                    type: 'success',
                    content: 'Course added successfully!',
                });
            }

            setModalOpen(false)
            setIsSaving(false)
            form.resetFields()
        }).catch(() => {
            console.log("Form has error!")
            setIsSaving(false)
        })
    }

    const deleteButtonClicked = async (e, id) => {
        const response = await apiService.delete('course', id);

        messageApi.open({
            type: 'success',
            content: 'Course deleted successfully!',
        });

        setData(data.filter(e => e.courseId != id))
    }

    const editButtonClicked = (e, id) => {
        setIsEditing(true)
        setModalOpen(true)
        setEditingCourse(id)
        form.resetFields()

        form.setFieldsValue(data.find(e => e.courseId === id))
    }

    const editCourse = async (e) => {
        form.validateFields().then(async () => {
            setIsSaving(true)
            const dataToBeUpdated = form.getFieldsValue()
            
            const response = await apiService.update('course', editingCourse, dataToBeUpdated);

            if(response.data){
                setData(data.map(
                    (e) => {
                        if(e.courseId === editingCourse)
                            return response.data

                        return {...e}
                    }
                ))

                messageApi.open({
                    type: 'success',
                    content: 'Course edited successfully!',
                });
            }

            setModalOpen(false)
            setEditingCourse()
            setIsEditing(false)
            setIsSaving(false)
            form.resetFields()
        }).catch(() => {
            setIsSaving(false)  
            console.log("Form has error!")
        })
    }

    const assignLecture = async (e, courseId) => {
        setIsLectureDataLoading(true)
        setAssignModalOpen(true)
        setCourseId(courseId)

        const response = await apiService.search('user', {
            query: {
                role : "instructor"
            }
        });  
        if(response) {
            setInstructorData(response.map(e => {
                return {
                    ...e,
                    key : e.userId,
                    status: false
                }
            }));
        }

        if(selectedDate)
            await onChange('', selectedDate)

        setIsLectureDataLoading(false)
    }

    const assignLectureNow = async (e) => {
        setIsSaving(true)

        const dataToBeAdded = selectedInstructor.map(e => {
            return {
                instructorId : e,
                courseId : courseId,
                date : selectedDate,
                courseName : data.find(c => c.courseId === courseId).name,
                instructorName : instructorData.find(i => i.userId === e).name
            }
        })

        const response = await apiService.batchinsert('lecture', dataToBeAdded);

        messageApi.open({
            type: 'success',
            content: 'Lecture assigned to instructor successfully!',
        });

        // if(response.data)
        //     setData([...data, response.data])

        console.log(response.data)

        setIsSaving(false)
        setAssignModalOpen(false)
     
        setSelectedInstructor([])
    }

    const onChange = async (date, dateString) => {
        console.log(date, dateString);
        setSelectedDate(dateString)

        if(!dateString){
            setDateSelected(false)
        } else {        
            setIsLectureDataLoading(true)

            

            const response = await apiService.search('lecture', {
                query : {
                    date : dateString
                }
            }); 
            
            if(response) {
                setInstructorData(instructorData.map(
                    (e) => {
                        const foundInstructor = response?.find(l => l.instructorId === e.userId)

                        if(foundInstructor)
                            return {
                                ...e,
                                status : true
                            }
                        else 
                            return {
                                ...e,
                                status : false
                            }
                    }
                ));
            }

            setIsLectureDataLoading(false)

            setDateSelected(true)
        }
    };

    const rowSelection = {
        selectedRowKeys:selectedInstructor,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedInstructor(selectedRowKeys)
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            disabled: !dateSelected || record?.status, // Column configuration not to be checked
            id: record.userId,
        }),
    };

    return <>
        {contextHolder}
        <CourseTable assignLecture={assignLecture} isTableDataLoading={isTableDataLoading} data={data} setAddButton={setModalOpen} addButton={modalOpen} deleteNow={deleteButtonClicked} editNow={editButtonClicked}/>

        <Modal
            title={`${isEditing ? "Edit" : "Add"} Course Detail`}
            centered
            open={modalOpen}
            okButtonProps={{loading : isSaving}}
            okText={isEditing ? "Update" : "Save"}
            cancelText="Discard"
            onOk={(e) => {
                if(isEditing)
                    editCourse(e)
                else
                    saveButtonClicked(e)
            }}
            onCancel={() => {
                form.resetFields()
                setIsEditing(false)
                setModalOpen(false)
            }}
        >
            <Form
                form={form}
                name="layout-multiple-horizontal"
                layout="vertical"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                >
                <Form.Item
                    layout="vertical"
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter name' }]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                >
                    <Input placeholder="Enter instructor name" />
                </Form.Item>

                <Form.Item
                    label="Level"
                    name="level"
                    rules={[{ required: true, message: 'Please enter level' }]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    >
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Select level (Ex: Beginner, Intermediate ...)"
                    >
                        <Option value="Beginner">Beginner</Option>
                        <Option value="Intermediate">Intermediate</Option>
                        <Option value="Advanced">Advanced</Option>
                        <Option value="Expert">Expert</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    layout="vertical"
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please description name' }]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                >
                    <TextArea placeholder="Enter description name" />
                </Form.Item>
            </Form>
        </Modal>

        <Modal
            title={`Assign Lecture to Instructor`}
            centered
            open={assignModalOpen}
            okButtonProps={{loading : isSaving, disabled : selectedInstructor?.length === 0}}
            okText={"Assign"}
            cancelText="Discard"
            onOk={(e) => assignLectureNow(e)}
            onCancel={() => {
                setAssignModalOpen(false)
            }}
        >
            <DatePicker style={{width : "100%", marginBottom : "15px"}} onChange={onChange} />

            <Table pagination={false} loading={isLectureDataLoading} rowSelection={Object.assign({ type: 'checkbox' }, rowSelection)} dataSource={instructorData} columns={instructorColumns} />

            <Alert
                message="Informational Notes"
                description="Instructor who have Date Clash will now be able to select!"
                type="info"
                showIcon
                />
        </Modal>
    </>
}


export default Course;