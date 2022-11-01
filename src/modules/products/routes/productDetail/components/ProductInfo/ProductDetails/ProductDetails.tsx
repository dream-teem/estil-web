import Button from '@/components/Elements/Button/Button'
import { LinkWrapper } from '@/components/Elements/LinkWrapper/LinkWrapper'
import { Spacer } from '@/components/Elements/Spacer/Spacer'
import DeleteModal from '@/components/Modal/ActionModal/DeleteModal'
import Modal from '@/components/Modal/Modal'
import { useModal } from '@/components/Modal/useModal'
import { Title } from '@/components/Typography/Title'
import { useAuth } from '@/hooks/useAuth'
import productApi from '@/services/products/api'
import { GetProductResponse } from '@/services/products/types'
import { Call } from '@styled-icons/ionicons-outline/Call'
import moment from 'moment'
// TODO: make dynamic import
import 'moment/locale/ru'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import * as Styled from './styles'

type Props = {
  product: GetProductResponse
}

function ProductDetails({ product }: Props) {
  const [deleteProduct, { isLoading }] =
    productApi.endpoints.delete.useMutation()

  const { toggle, isShown } = useModal()
  const { toggle: togglePhone, isShown: isPhoneShown } = useModal()

  const {
    t,
    i18n: { language }
  } = useTranslation(['common', 'product'])

  const { user } = useAuth()

  const router = useRouter()

  const handleDelete = async () => {
    await deleteProduct(product.id).unwrap()
    // close modal
    toggle()
    if (user) router.push(`/profile/${user?.username}`)
  }

  const tableRows = [
    {
      title: t('product:size'),
      value: product.size?.title
    },
    {
      title: t('product:brand'),
      value: product.brand?.name
    },
    {
      title: t('product:condition'),
      value: product.condition.title
    },
    {
      title: t('product:category'),
      value: product.category.name
    },
    {
      title: t('common:location'),
      value: product.city?.name
    }
  ]

  const getDate = () => {
    return moment(product.createdAt).locale(language).fromNow()
  }
  return (
    <Styled.ProductDetailsWrapper>
      <Styled.ProductPriceWrapper>
        <Title>
          {product.price} {product.currency}
        </Title>
        <Styled.ProductPriceButtonWrapper>
          {product.moderator ? (
            <>
              <Link href={`/products/edit/${product.slug}`}>
                <LinkWrapper>
                  <Button
                    className="edit-button"
                    fullWidth={true}
                    variant="outline"
                  >
                    {t('common:edit')}
                  </Button>
                </LinkWrapper>
              </Link>
              <Button
                className="delete-button"
                onClick={toggle}
                color="danger"
                fullWidth={true}
                isLoading={isLoading}
              >
                {t('common:delete')}
              </Button>
            </>
          ) : (
            <Button fullWidth={true} onClick={togglePhone}>
              {t('common:buy')}
            </Button>
          )}
        </Styled.ProductPriceButtonWrapper>
      </Styled.ProductPriceWrapper>
      <Styled.ProductInfoTable>
        <Styled.TableBody>
          {tableRows
            .filter(row => row.value)
            .map(row => (
              <Styled.TableRow key={row.title}>
                <Styled.TableHeader>{row.title}</Styled.TableHeader>
                <Styled.TableData>{row.value}</Styled.TableData>
              </Styled.TableRow>
            ))}
        </Styled.TableBody>
      </Styled.ProductInfoTable>
      <Styled.TimeText>
        {t('product:listedOn', { date: getDate() })}
      </Styled.TimeText>
      <Spacer variant="l" />
      <Styled.ProductDescription>
        {product.description}
      </Styled.ProductDescription>
      <DeleteModal
        isShown={isShown}
        explanation={t('common:confirmation.deleteListing')}
        onClose={toggle}
        onConfirm={handleDelete}
      />
      {isPhoneShown && (
        <Modal
          title={t('common:phone')}
          onClose={togglePhone}
          footerButton={
            <Button fullWidth={true} onClick={togglePhone}>
              {t('common:close')}
            </Button>
          }
        >
          <Styled.PhoneNumberWrapper>
            <Call width={25} className="call-icon" />{' '}
            <b>{product.seller.phone}</b>
          </Styled.PhoneNumberWrapper>
        </Modal>
      )}
    </Styled.ProductDetailsWrapper>
  )
}

export default ProductDetails
