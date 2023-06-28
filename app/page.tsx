'use client'
import Image from 'next/image'
import styles from './page.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react';
import meJpg from '../public/images/me.jpg'

export default function Home() {
	const [data, setData] = useState({
		count: 0,
		distinctCount: 0
	});

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const url = document.location.origin + '/api/count';
		axios.get(url).then((res) => {
			setData(res.data);
			setIsLoading(false);
		});
	}, []);
	return (
		<div className={styles.mainContainer}>
			{isLoading && (
				<div className={styles.loading}>
					<div className={styles.loadingText}>Carregando...</div>
				</div>

			) || (
				<div className={styles.count}>
					<span>Total de acessos: {data.count}</span>
					<span>Acessos distintos: {data.distinctCount}</span>
				</div>
			)}
			<Image className={styles.meJpg} src={meJpg} alt="me" width="200" height="200" />
			<div className="title-wrapper">
				<h1 className="sweet-title">
					<span data-text="Faço">Faço</span>
					<span data-text="Programa">Programa</span>
				</h1>
			</div>
			
		</div>
	)
}
