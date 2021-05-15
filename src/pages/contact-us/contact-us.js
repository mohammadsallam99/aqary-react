import React, { useEffect, useState } from 'react';
import ReactImageUploadComponent from '../../assets/components/react-images-upload';
import MainContainer from '../../components/main-container';
import uuid from 'uuid-random';
import DjangoCSRFToken from 'django-react-csrftoken'
import $ from 'jquery';
import { Alert } from 'bootstrap';
import FadeIn from 'react-fade-in';

const ContactUs = (props) => {

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [pictures, setPictures] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);

    const onDrop = picture => {
        setPictures([...pictures, ...picture]);
    };

    const submit = async () => {
        let myHeaders = new Headers();
        myHeaders.append('X-CSRFToken', $('input[name="csrfmiddlewaretoken"]').val());

        let formdata = new FormData();
        formdata.append("title", title);
        formdata.append("email", email);
        formdata.append("message", message);
        formdata.append("mobile", mobile);


        for (let i = 0; i < pictures.length; i++)
            formdata.append("images", pictures[i]);

        const requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow',
            headers: myHeaders,
            credentials: "same-origin"
        };

        await fetch("/API/contact-us/", requestOptions)
            .then(response => response.text())
            .then(result => {
                //reset values
                setTitle('');
                setEmail('');
                setMessage('');
                setMobile('');
                setPictures([]);

                setShowSuccess(true);
                window.location.reload();
                setTimeout(() => {setShowSuccess(false);}, 3000)
            })
            .catch(error => console.log('error', error))
    }

    return (
        <MainContainer>
            <div className="form">
                <FadeIn visible={showSuccess} className={showSuccess ? "" : "h-none"}>
                    <div role="alert" class="fade alert alert-success show">
                        <i class="fas fa-check"></i>
                        <span>تم إرسال رسالتك بنجاح! شكراً على تواصلك معنا.</span>
                    </div>
                </FadeIn>
                <form id="contact-us-form">
                    <DjangoCSRFToken />
                    <div class="mb-3">
                        <label for="cu-title" class="form-label">عنوان الرسالة:</label>
                        <input
                            type="text" required
                            class="form-control" id="cu-title"
                            aria-describedby="title" placeholder="طلب نشر اعلان"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="cu-email" class="form-label">البريد الإلكتروني:</label>
                        <input
                            type="email" required
                            class="form-control" id="cu-email"
                            aria-describedby="emailHelp" placeholder="john@example.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="cu-mobile" class="form-label">رقم الهاتف:</label>
                        <input
                            type="text" required
                            class="form-control" id="cu-mobile"
                            placeholder="+962 78 660 7887"
                            value={mobile}
                            onChange={e => setMobile(e.target.value)}
                        />
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="cu-message">الرسالة:</label>
                        <textarea
                            type="checkbox" class="form-control"
                            rows={5} id="cu-message"
                            required placeholder="تفاصيل الموضوع"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        />
                    </div>
                    <ReactImageUploadComponent
                        {...props}
                        withPreview
                        fileTypeError=" صيغة الملف غير مدعومة"
                        fileSizeError=" حجم الملف يتخطى الحجم الأقصى"
                        buttonText="ارفق صوراً"
                        label="الحجم الأقصى للملف: 5MB"
                        withIcon={true}
                        onChange={onDrop}
                        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                        maxFileSize={5242880}
                    />
                    <button type="submit"
                        id="submit-button"
                        onClick={(e) => {
                            e.preventDefault();
                            let ele = document.getElementById("contact-us-form");
                            let chk_status = ele.checkValidity();
                            ele.reportValidity();
                            if (chk_status) {
                                submit()
                            }
                        }} class="btn btn-primary">ارسال</button>
                </form>
            </div>
        </MainContainer >
    )
}

export default ContactUs;