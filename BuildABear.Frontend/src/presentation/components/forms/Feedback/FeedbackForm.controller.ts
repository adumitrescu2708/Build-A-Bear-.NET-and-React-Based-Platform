import { useForm, Controller } from 'react-hook-form';
import { SelectChangeEvent } from '@mui/material';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { isUndefined } from 'lodash';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { FeedbackGrade, FeedbackServiceAction } from '@infrastructure/apis/client';
import { useFeedbackApi } from '@infrastructure/apis/api-management/feedback';
import { FeedbackFormController, FeedbackFormModel } from './FeedbackForm.types';

const getDefaultValues = (initialData?: {}) => {
    const defaultValues = {
        comments: '',
        feedbackGrade: '',
        feedbackServiceAction: '',
        contact: false,
    };

    if (!isUndefined(initialData)) {
        return {
            ...defaultValues,
            ...initialData,
        };
    }

    return defaultValues;
};

export const useInitRegisterForm = () => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues();
    const schema = yup.object().shape({
        comments: yup.string()
            .required(formatMessage(
                { id: 'globals.validations.requiredField' },
                {
                    fieldName: formatMessage({
                        id: 'globals.comments',
                    }),
                })),
        contact: yup.bool(),
        feedbackGrade: yup.string()
            .oneOf([
                FeedbackGrade.Poor,
                FeedbackGrade.Average,
                FeedbackGrade.Good,
                FeedbackGrade.Excellent,
                FeedbackGrade.VeryPoor,
            ])
            .required(formatMessage(
                { id: 'globals.validations.requiredField' },
                {
                    fieldName: formatMessage({
                        id: 'globals.feedbackGrade',
                    }),
                })),
        feedbackServiceAction: yup.string()
            .oneOf([
                FeedbackServiceAction.BuyTeddy,
                FeedbackServiceAction.ReturnTeddy,
                FeedbackServiceAction.ShippingTeddy,
                FeedbackServiceAction.Cashback,
            ])
            .required(formatMessage(
                { id: 'globals.validations.requiredField' },
                {
                    fieldName: formatMessage({
                        id: 'globals.feedbackServiceAction',
                    }),
                })),
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
};

export const useFeedbackFormController = (onSubmit?: () => void): FeedbackFormController => {
    const { formatMessage } = useIntl();
    const { defaultValues, resolver } = useInitRegisterForm();
    const { addFeedback: { mutation: addFeedback, key: addFeedbackKey } } = useFeedbackApi();
    const { mutateAsync: add, status } = useMutation({
        mutationKey: [addFeedbackKey],
        mutationFn: addFeedback,
    });
    const submit = useCallback((data: FeedbackFormModel) =>
        add(data).then(() => {
            if (onSubmit) {
                onSubmit();
            }
            toast(formatMessage({ id: 'notifications.messages.feedbackSuccess' }));
        }).catch(error => {
            toast(formatMessage({ id: 'notifications.messages.feedbackError' }));
        }), [add]);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        formState: { errors },
    } = useForm<FeedbackFormModel>({
        defaultValues,
        resolver,
    });

    const selectGrade = useCallback((event: SelectChangeEvent<FeedbackGrade>) => {
        setValue('feedbackGrade', event.target.value as FeedbackGrade, {
            shouldValidate: true,
        });
    }, [setValue]);

    const selectFeedbackServiceAction = useCallback((event: SelectChangeEvent<FeedbackServiceAction>) => {
        setValue('feedbackServiceAction', event.target.value as FeedbackServiceAction, {
            shouldValidate: true,
        });
    }, [setValue]);

    return {
        actions: {
            handleSubmit,
            submit,
            register,
            watch,
            setValue,
            control,
            selectGrade,
            selectFeedbackServiceAction,
        },
        computed: {
            defaultValues,
            isSubmitting: status === 'pending',
        },
        state: {
            errors,
        },
    };
};
