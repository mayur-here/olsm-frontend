import { useEffect, useState } from "react";
import InstructorTable from "../../InstructorTable";
import { Button, Modal,Form, Input, Row, Col, InputNumber, Select, message } from 'antd';
import apiService from "../../services/apiService";

const Instructor = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const [data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingUser, setEditingUser] = useState();
    const [isSaving, setIsSaving] = useState(false);
    const [isTableDataLoading, setIsTableDataLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await apiService.search('user', {
                query: {
                    role : "instructor"
                }
            });  // Passing empty query to fetch all data
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

    const saveButtonClicked = (e) => {
        form.validateFields().then(async () => {
            setIsSaving(true)
            const dataToBeAdded = form.getFieldsValue()

            const response = await apiService.insert('user', {...dataToBeAdded, role: "instructor" });

            if(response.data){
                setData([...data, response.data])
            
                messageApi.open({
                    type: 'success',
                    content: 'Instructor added successfully!',
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
        const response = await apiService.delete('user', id);

        messageApi.open({
            type: 'success',
            content: 'Instructor deleted successfully!',
        });

        setData(data.filter(e => e.userId != id))
    }

    const editButtonClicked = (e, id) => {
        setIsEditing(true)
        setModalOpen(true)
        setEditingUser(id)
        form.resetFields()

        form.setFieldsValue(data.find(e => e.userId === id))
    }

    const editUser = async (e) => {
        form.validateFields().then(async () => {
            setIsSaving(true)
            const dataToBeUpdated = form.getFieldsValue()
            
            const response = await apiService.update('user', editingUser, dataToBeUpdated);

            if(response.data){
                setData(data.map(
                    (e) => {
                        if(e.userId === editingUser)
                            return response.data

                        return {...e}
                    }
                ))

                messageApi.open({
                    type: 'success',
                    content: 'Instructor edited successfully!',
                });
            }

            setModalOpen(false)
            setEditingUser()
            setIsEditing(false)
            setIsSaving(false)
            form.resetFields()
        }).catch(() => {
            setIsSaving(false)  
            console.log("Form has error!")
        })
    }

    return <>
        {contextHolder}
        <InstructorTable isTableDataLoading={isTableDataLoading} data={data} setAddButton={setModalOpen} addButton={modalOpen} deleteNow={deleteButtonClicked} editNow={editButtonClicked}/>

        <Modal
            title={`${isEditing ? "Edit" : "Add"} Instructor Detail`}
            centered
            open={modalOpen}
            okButtonProps={{loading : isSaving}}
            okText={isEditing ? "Update" : "Save"}
            cancelText="Discard"
            onOk={(e) => {
                if(isEditing)
                    editUser(e)
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

                <Row gutter={24}>
                    <Col span={16}>
                        <Form.Item
                            layout="vertical"
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please enter email' }]}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                        >
                            <Input inputMode="email" placeholder="Enter instructor email" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            layout="vertical"
                            label="Age"
                            name="age"
                            rules={[{ required: true, message: 'Please enter age' }]}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                        >
                            <InputNumber style={{ width: '100%' }} placeholder="Enter age" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    label="Skills"
                    name="skills"
                    rules={[{ required: true, message: 'Please enter skills' }]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    >
                    <Select
                        mode="tags"
                        style={{ width: '100%' }}
                        placeholder="Enter skills (Ex: React, Node, MongoDB)"
                    >
                        <Option value="React">React</Option>
                        <Option value="Node">Node</Option>
                        <Option value="MongoDB">MongoDB</Option>
                        <Option value="Express">Express</Option>
                        <Option value="Typescript">Typescript</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    layout="vertical"
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please password' }]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                >
                    <Input type="password" placeholder="Enter password" />
                </Form.Item>
            </Form>
        </Modal>
    </>
}


export default Instructor;